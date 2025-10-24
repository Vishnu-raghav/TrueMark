import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Organization } from "../models/Organization.model.js";
import { User } from "../models/user.model.js";
import { AuditLog } from "../models/AuditLog.model.js";

/**
 * Write audit log
 */
const writeAudit = async ({ req, organization = null, user = null, action, details = {}, severity = "INFO" }) => {
  try {
    await AuditLog.create({
      organization: organization?._id || user?.organization || null,
      user: user?._id || null,
      action,
      details,
      ipAddress: req?.ip,
      userAgent: req?.headers?.["user-agent"] || null,
      severity,
    });
  } catch (e) {
    console.error("Audit write failed:", e.message);
  }
};

/**
 * Generate access & refresh token for organization
 */
const generateAccessAndRefreshToken = async (organization) => {
  const accessToken = organization.generateAccessToken();
  const refreshToken = organization.generateRefreshToken();

  organization.refreshToken = refreshToken;
  await organization.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

/**
 * Register organization
 */
const registerOrganization = asyncHandler(async (req, res) => {
  const { orgName, orgEmail, adminName, adminEmail, adminPassword, type, address, phone, website, description } = req.body;
  
  if (![orgName, orgEmail, adminName, adminEmail, adminPassword].every(Boolean)) {
    throw new ApiError(400, "Organization name, email, admin name, admin email and password are required");
  }

  // Check if organization already exists
  const existingOrg = await Organization.findOne({ 
    $or: [{ name: orgName }, { email: orgEmail }] 
  });
  if (existingOrg) {
    throw new ApiError(400, "Organization with this name or email already exists");
  }

  // Check if admin email already in use
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    throw new ApiError(400, "Admin email already in use");
  }

  // Create organization
  const org = await Organization.create({
    name: orgName,
    email: orgEmail,
    type: type || "other",
    password: adminPassword,
    address: address || "",
    phone: phone || "",
    website: website || "",
    description: description || "",
    status: process.env.AUTO_APPROVE_ORG === "true" ? "active" : "pending"
  });

  // Create admin user
  const adminUser = await User.create({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: "orgAdmin",
    organization: org._id,
  });

  // Update organization with admin reference
  org.admin = adminUser._id;
  org.members.push(adminUser._id);
  org.staff.push({
    user: adminUser._id,
    role: "orgAdmin"
  });
  await org.save();

  await writeAudit({
    req,
    organization: org,
    user: adminUser,
    action: "REGISTER_ORG",
    details: { 
      adminEmail,
      status: org.status 
    },
  });

  return res.status(201).json(
    new ApiResponse(
      201, 
      { 
        organization: org, 
        admin: adminUser 
      }, 
      `Organization registered successfully. Status: ${org.status}`
    )
  );
});

/**
 * Login organization
 */
const loginOrganization = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password required");

  let org = await Organization.findOne({ email }).select("+password +refreshToken");

  if (!org) {
    // Try finding via admin user
    const adminUser = await User.findOne({ email, role: "orgAdmin" }).select("+password");
    if (!adminUser) throw new ApiError(401, "Invalid credentials");

    const isMatch = await adminUser.isPasswordCorrect(password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    org = await Organization.findById(adminUser.organization).select("+password +refreshToken");
    if (!org) throw new ApiError(401, "Organization not found for admin");
  } else {
    const isMatch = await org.isPasswordCorrect(password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");
  }

  // Check organization status
  if (org.status !== "active") {
    throw new ApiError(403, `Organization account is ${org.status}. Please contact support.`);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(org);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  await writeAudit({ req, organization: org, action: "ORG_LOGIN" });

  return res
    .status(200)
    .cookie("orgAccessToken", accessToken, cookieOptions)
    .cookie("orgRefreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { organization: org, accessToken, refreshToken }, "Organization logged in successfully"));
});

/**
 * Refresh organization access token
 */
const refreshOrgAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.orgRefreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "No refresh token provided");

  const org = await Organization.findOne({ refreshToken: incomingRefreshToken }).select("+refreshToken");
  if (!org) throw new ApiError(401, "Invalid token");

  try {
    jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(org);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    await writeAudit({ req, organization: org, action: "REFRESH_ORG_TOKEN" });

    return res
      .status(200)
      .cookie("orgAccessToken", accessToken, cookieOptions)
      .cookie("orgRefreshToken", refreshToken, cookieOptions)
      .json(new ApiResponse(200, { accessToken, refreshToken }, "Token refreshed"));
  } catch (err) {
    org.refreshToken = undefined;
    await org.save({ validateBeforeSave: false });
    throw new ApiError(401, "Invalid refresh token");
  }
});

/**
 * Logout organization
 */
const logoutOrganization = asyncHandler(async (req, res) => {
  const orgId = req.organization?._id;
  if (orgId) {
    await Organization.findByIdAndUpdate(orgId, { refreshToken: undefined });
    await writeAudit({ req, organization: orgId, action: "ORG_LOGOUT" });
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.clearCookie("orgAccessToken", cookieOptions).clearCookie("orgRefreshToken", cookieOptions);
  return res.status(200).json(new ApiResponse(200, {}, "Organization logged out successfully"));
});

/**
 * Assign role to user (Improved)
 */
const assignRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) throw new ApiError(400, "User ID and role are required");
  if (!["issuer", "orgAdmin"].includes(role)) throw new ApiError(400, "Invalid role. Must be 'issuer' or 'orgAdmin'");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Authorization check
  if (req.user.role !== "superAdmin" && req.user.role !== "orgAdmin") {
    throw new ApiError(403, "You are not authorized to assign roles");
  }

  // Organization check
  if (req.user.role === "orgAdmin" && String(user.organization) !== String(req.user.organization)) {
    throw new ApiError(403, "You can only assign roles to users in your organization");
  }

  // Update user role
  user.role = role;
  await user.save();

  // Update organization staff array
  const org = await Organization.findById(user.organization);
  if (org) {
    // Remove existing staff entry if exists
    org.staff = org.staff.filter(staff => String(staff.user) !== String(userId));
    
    // Add new staff entry
    org.staff.push({
      user: userId,
      role: role,
      assignedAt: new Date()
    });
    
    await org.save();
  }

  await writeAudit({
    req,
    organization: user.organization,
    user: req.user._id,
    action: "ASSIGN_ROLE",
    details: { assignedTo: user.email, role },
  });

  return res.status(200).json(
    new ApiResponse(200, user, `Role ${role} assigned successfully to ${user.name}`)
  );
});

/**
 * Get organization details
 */
const getOrganization = asyncHandler(async (req, res) => {
  const org = await Organization.findById(req.organization?._id || req.user.organization)
    .populate("admin", "name email")
    .populate("members", "name email role")
    .populate("staff.user", "name email role");

  if (!org) throw new ApiError(404, "Organization not found");

  return res.status(200).json(
    new ApiResponse(200, org, "Organization details fetched successfully")
  );
});

export { 
  registerOrganization, 
  loginOrganization, 
  refreshOrgAccessToken, 
  logoutOrganization, 
  assignRole,
  getOrganization 
};