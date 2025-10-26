import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

/**
 * cookie options - development ke liye
 */
const getCookieOptions = () => {
  return {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax', 
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  };
};

/**
 * Register user 
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, dateOfBirth, educationLevel } = req.body;
  
  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    throw new ApiError(400, "First name, last name, email and password are required");
  }

  // Check if user exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  // Create user
  const user = await User.create({ 
    name: `${firstName} ${lastName}`,
    email, 
    password, 
    role: "member",
    organization: null,
    phone: phone || "",
    dateOfBirth: dateOfBirth || null,
    educationLevel: educationLevel || ""
  });

  
  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(201).json(
    new ApiResponse(201, { user: safeUser }, "User registered successfully")
  );
});

/**
 * Login User - Simple version
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user with password
  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
  
  // Get user without sensitive data
  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  // Set cookies
  const cookieOptions = getCookieOptions();

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200, 
        { user: safeUser, accessToken }, 
        "Login successful"
      )
    );
});

/**
 * Logout - Simple version
 */
const logoutUser = asyncHandler(async (req, res) => {
  
  await User.findByIdAndUpdate(req.user._id, { refreshToken: undefined });

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

/**
 * Get current user
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  
  return res.status(200).json(
    new ApiResponse(200, user, "User fetched successfully")
  );
});

/**
 * Refresh Token - Simple version
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select("+refreshToken");
    
    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

    const cookieOptions = getCookieOptions();

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(200, { accessToken }, "Token refreshed")
      );
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

/**
 * Change Password - Simple version
 */
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, "All fields are required");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Passwords don't match");
  }

  const user = await User.findById(req.user._id).select("+password");
  
  const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isOldPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json(
    new ApiResponse(200, {}, "Password updated successfully")
  );
});

/**
 * Update Profile - Simple version
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