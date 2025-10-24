import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { AuditLog } from "../models/AuditLog.model.js";
import jwt from "jsonwebtoken";

/**
 * Helper: write audit log
 */
const writeAudit = async ({ req, user = null, action, details = {}, severity = "INFO" }) => {
  try {
    await AuditLog.create({
      user: user ? user._id || user : null,
      organization: user?.organization || null,
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
 * Helper: generate access & refresh tokens
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
 * Register user (ONLY for members - without organization)
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, dateOfBirth, educationLevel } = req.body;
  
  // Required fields check - only essential fields for member registration
  if (!firstName || !lastName || !email || !password) {
    throw new ApiError(400, "First name, last name, email and password are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  // Create member without organization
  const user = await User.create({ 
    name: `${firstName} ${lastName}`,
    email, 
    password, 
    role: "member", // ✅ ALWAYS member role for public registration
    organization: null, // ✅ No organization for new members
    phone: phone || "",
    dateOfBirth: dateOfBirth || null,
    educationLevel: educationLevel || ""
  });

  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  await writeAudit({ 
    req, 
    user: safeUser, 
    action: "REGISTER_USER", 
    details: { 
      role: "member",
      hasOrganization: false 
    } 
  });

  return res.status(201).json(
    new ApiResponse(201, { user: safeUser }, "User registered successfully")
  );
});

/**
 * Login User
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password required");

  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user) throw new ApiError(401, "Invalid credentials");

  const ok = await user.isPasswordCorrect(password);
  if (!ok) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  await writeAudit({ req, user: safeUser, action: "USER_LOGIN" });

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { user: safeUser, accessToken }, "Login successful"));
});

/**
 * Logout
 */
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (userId) {
    await User.findByIdAndUpdate(userId, { refreshToken: undefined });
    await writeAudit({ req, user: userId, action: "USER_LOGOUT" });
  }
  res.clearCookie("accessToken").clearCookie("refreshToken");
  return res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
});

/**
 * Get current user
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken").populate("organization");
  return res.status(200).json(new ApiResponse(200, user, "Fetched current user"));
});

/**
 * Refresh Access Token
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

/**
 * Update user profile (for members)
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const { phone, dateOfBirth, educationLevel } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        ...(phone && { phone }),
        ...(dateOfBirth && { dateOfBirth }),
        ...(educationLevel && { educationLevel })
      }
    },
    { new: true }
  ).select("-password -refreshToken");

  await writeAudit({ req, user: user._id, action: "UPDATE_PROFILE" });

  return res.status(200).json(
    new ApiResponse(200, { user }, "Profile updated successfully")
  );
});

export { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getCurrentUser, 
  refreshAccessToken, 
  changeCurrentPassword,
  updateUserProfile 
};