import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Organization } from "../models/Organization.model.js";
import { AuditLog } from "../models/AuditLog.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * helper: create audit log
 */
const writeAudit = async ({ req, user = null, organization = null, action, details = {}, severity = "INFO" }) => {
  try {
    await AuditLog.create({
      organization: organization ? organization._id || organization : user?.organization || null,
      user: user ? user._id || user : null,
      action,
      details,
      ipAddress: req?.ip || (req?.headers && req.headers["x-forwarded-for"]) || null,
      userAgent: req?.headers?.["user-agent"] || null,
      severity,
    });
  } catch (e) {
    console.error("Audit write failed:", e?.message || e);
  }
};

/**
 * token creator: saves refresh token on user doc
 */
const generateAccessAndRefreshToken = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(500, "Error generating tokens");
  }
};

/**
 * Register organization + create org admin
 * POST /auth/register-organization
 * body: { orgName, orgEmail, adminName, adminEmail, adminPassword, type }
 */
const registerOrganization = asyncHandler(async (req, res) => {
  const { orgName, orgEmail, adminName, adminEmail, adminPassword, type } = req.body;

  if (![orgName, orgEmail, adminName, adminEmail, adminPassword].every(Boolean)) {
    throw new ApiError(400, "All fields are required");
  }

  const existingOrg = await Organization.findOne({ $or: [{ name: orgName }, { email: orgEmail }] });
  if (existingOrg) throw new ApiError(400, "Organization already exists");

  const tenantKey = `ORG-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  const org = await Organization.create({
    name: orgName,
    email: orgEmail,
    type: type || "other",
    tenantKey,
    status: process.env.AUTO_APPROVE_ORG === "true" ? "active" : "pending",
  });

  const existingUser = await User.findOne({ email: adminEmail });
  if (existingUser) {
    existingUser.organization = org._id;
    existingUser.role = "orgAdmin";
    await existingUser.save({ validateBeforeSave: false });
    await writeAudit({ req, user: existingUser, organization: org, action: "REGISTER_ORG", details: { info: "existing user became orgAdmin" } });
    return res.status(201).json(new ApiResponse(201, { organization: org, user: existingUser }, "Organization created and admin assigned (existing user)"));
  }

  const user = await User.create({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: "orgAdmin",
    organization: org._id,
  });

  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  await writeAudit({ req, user: safeUser, organization: org, action: "REGISTER_ORG", details: { tenantKey } });

  return res.status(201).json(new ApiResponse(201, { organization: org, user: safeUser }, "Organization registered successfully"));
});

/**
 * Register user (join existing org) - invite flow OR self-join by orgId
 * POST /auth/register
 * body: { name, email, password, organizationId }
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, organizationId } = req.body;

  if (![name, email, password, organizationId].every(Boolean)) {
    throw new ApiError(400, "All fields are required");
  }

  const org = await Organization.findById(organizationId);
  if (!org || org.status !== "active") throw new ApiError(400, "Organization not available or not active");

  const existedUser = await User.findOne({ email });
  if (existedUser) throw new ApiError(400, "User already exists");

  const user = await User.create({
    name,
    email,
    password,
    role: "member",
    organization: org._id,
  });

  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  await writeAudit({ req, user: safeUser, organization: org, action: "REGISTER_USER", details: { role: "member" } });

  return res.status(201).json(new ApiResponse(201, safeUser, "User registered and joined organization"));
});

/**
 * Login
 * POST /auth/login
 * body: { email, password }
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password required");

  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user) throw new ApiError(401, "Invalid credentials");

  const ok = await user.isPasswordCorrect(password);
  if (!ok) {
    await writeAudit({ req, user: user._id, action: "FAILED_LOGIN", details: { email } });
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  };

  await writeAudit({ req, user: safeUser, action: "USER_LOGIN", details: { method: "password" } });

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { user: safeUser, accessToken, refreshToken }, "Logged in successfully"));
});

/**
 * Logout
 * POST /auth/logout
 */
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (userId) {
    await User.findByIdAndUpdate(userId, { $set: { refreshToken: undefined } }, { new: true });
    await writeAudit({ req, user: userId, action: "USER_LOGOUT" });
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.clearCookie("accessToken", cookieOptions).clearCookie("refreshToken", cookieOptions);
  return res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
});

/**
 * Refresh access token
 * POST /auth/refresh
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "No refresh token provided");

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded?._id).select("+refreshToken");
    if (!user) throw new ApiError(401, "Invalid token");

    if (incomingRefreshToken !== user.refreshToken) {
      user.refreshToken = undefined;
      await user.save({ validateBeforeSave: false });
      throw new ApiError(401, "Refresh token invalid or rotated");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };

    await writeAudit({ req, user: user._id, action: "REFRESH_TOKEN" });

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(new ApiResponse(200, { accessToken, refreshToken }, "Token refreshed"));
  } catch (err) {
    throw new ApiError(401, err.message || "Invalid refresh token");
  }
});

/**
 * Change current password
 * POST /auth/change-password
 * body: { oldPassword, newPassword, confirmPassword }
 * user must be authenticated (req.user available)
 */
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) throw new ApiError(400, "All fields required");

  const user = await User.findById(req.user._id).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const match = await user.isPasswordCorrect(oldPassword);
  if (!match) throw new ApiError(400, "Old password incorrect");

  if (newPassword !== confirmPassword) throw new ApiError(400, "Passwords do not match");

  user.password = newPassword;
  await user.save(); 

  await writeAudit({ req, user: user._id, action: "CHANGE_PASSWORD" });

  return res.status(200).json(new ApiResponse(200, {}, "Password updated"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken").populate("organization");
  return res.status(200).json(new ApiResponse(200, user, "Current user fetched"));
});

/**
 * Assign issuer role to a user
 * POST /auth/assign-issuer
 * body: { userId }
 */

const assignIssuer = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) throw new ApiError(400, "User ID is required");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Ensure issuer role can only be assigned within same organization
  if (
    req.user.role !== "superAdmin" &&
    (!user.organization || String(user.organization) !== String(req.user.organization))
  ) {
    throw new ApiError(403, "You are not authorized to assign issuer for this user");
  }

  user.role = "issuer";
  await user.save();

  // Audit log
  await writeAudit({
    req,
    user: req.user,
    organization: req.user.organization,
    action: "ASSIGN_ISSUER",
    details: { assignedTo: user.email, userId: user._id },
  });

  return res.status(200).json(new ApiResponse(200, user, "Issuer role assigned successfully"));
});
export {
  registerOrganization,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  assignIssuer,
};
