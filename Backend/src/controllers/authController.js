import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Organization } from "../models/Organization.model.js";
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
 */const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, dateOfBirth, educationLevel } = req.body;
  
  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    throw new ApiError(400, "First name, last name, email and password are required");
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please provide a valid email address");
  }

  // Check if user exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Extract email domain and find organization
  let organization = null;
  let autoConnected = false;
  
  try {
    const emailDomain = email.split('@')[1];
    
    if (emailDomain) {
      // Find active organization with matching domain
      organization = await Organization.findOne({ 
        emailDomain: emailDomain.toLowerCase(),
        status: "active" // Only connect to active organizations
      });
      
      autoConnected = !!organization;
    }
  } catch (error) {
    console.error("Error finding organization by domain:", error);
    // Continue without organization if there's an error
  }

  // Create user
  const user = await User.create({ 
    name: `${firstName} ${lastName}`.trim(),
    email: email.toLowerCase(), 
    password, 
    role: "member",
    organization: organization ? organization._id : null,
    phone: phone || "",
    dateOfBirth: dateOfBirth || null,
    educationLevel: educationLevel || ""
  });

  // Add user to organization's members list if connected
  if (organization) {
    try {
      await Organization.findByIdAndUpdate(
        organization._id,
        { 
          $addToSet: { members: user._id } // Use addToSet to avoid duplicates
        }
      );
    } catch (error) {
      console.error("Error adding user to organization members:", error);
      // Don't throw error, just log it
    }
  }

  // Get user without sensitive data
  const safeUser = await User.findById(user._id)
    .select("-password -refreshToken")
    .populate("organization", "name emailDomain"); // Populate organization details

  // Prepare response message
  let message = "User registered successfully";
  if (autoConnected) {
    message = `User registered and automatically connected to ${organization.name}`;
  }

  return res.status(201).json(
    new ApiResponse(
      201, 
      { 
        user: safeUser, 
        autoConnected,
        organization: organization ? {
          id: organization._id,
          name: organization.name,
          emailDomain: organization.emailDomain
        } : null
      }, 
      message
    )
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