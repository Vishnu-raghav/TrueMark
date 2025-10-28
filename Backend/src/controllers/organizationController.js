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
  const { 
    orgName, 
    orgEmail, 
    adminName, 
    adminEmail, 
    adminPassword, 
    type, 
    address, 
    phone, 
    website, 
    description, 
    emailDomain 
  } = req.body;
  
  // Required fields validation
  if (!orgName || !orgEmail || !adminName || !adminEmail || !adminPassword) {
    throw new ApiError(400, "Organization name, email, admin name, admin email and password are required");
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(orgEmail) || !emailRegex.test(adminEmail)) {
    throw new ApiError(400, "Please provide valid email addresses");
  }

  // Password strength validation
  if (adminPassword.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  // Email domain validation and setup
  let finalEmailDomain = emailDomain;
  
  if (!finalEmailDomain) {
    // Auto-extract from orgEmail
    const domainParts = orgEmail.split('@');
    if (domainParts.length !== 2) {
      throw new ApiError(400, "Invalid organization email format");
    }
    finalEmailDomain = domainParts[1];
  }

  // Validate email domain format
  if (!finalEmailDomain || !finalEmailDomain.includes('.')) {
    throw new ApiError(400, "Valid email domain is required (e.g., eitfaridabad.co.in)");
  }

  finalEmailDomain = finalEmailDomain.toLowerCase().trim();

  // Check if organization already exists
  const existingOrg = await Organization.findOne({ 
    $or: [
      { name: { $regex: new RegExp(`^${orgName}$`, 'i') } }, // Case insensitive
      { email: orgEmail.toLowerCase() },
      { emailDomain: finalEmailDomain }
    ] 
  });

  if (existingOrg) {
    if (existingOrg.name.toLowerCase() === orgName.toLowerCase()) {
      throw new ApiError(409, "Organization with this name already exists");
    }
    if (existingOrg.email === orgEmail.toLowerCase()) {
      throw new ApiError(409, "Organization with this email already exists");
    }
    if (existingOrg.emailDomain === finalEmailDomain) {
      throw new ApiError(409, "This email domain is already registered with another organization");
    }
  }

  // Check if admin email already in use
  const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });
  if (existingAdmin) {
    throw new ApiError(409, "Admin email already in use");
  }

  // Create organization in transaction to ensure data consistency
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create organization
    const org = await Organization.create([{
      name: orgName.trim(),
      email: orgEmail.toLowerCase(),
      type: type || "other",
      emailDomain: finalEmailDomain,
      password: adminPassword,
      address: address?.trim() || "",
      phone: phone?.trim() || "",
      website: website?.trim() || "",
      description: description?.trim() || "",
      status: process.env.AUTO_APPROVE_ORG === "true" ? "active" : "pending",
      settings: {
        autoApproveCertificates: false,
        allowMemberRegistration: true,
        maxUsers: 1000,
        autoApproveByDomain: true
      }
    }], { session });

    const organization = org[0];

    // Create admin user
    const adminUser = await User.create([{
      name: adminName.trim(),
      email: adminEmail.toLowerCase(),
      password: adminPassword,
      role: "orgAdmin",
      organization: organization._id,
      phone: phone?.trim() || "",
    }], { session });

    const admin = adminUser[0];

    // Update organization with admin reference
    organization.admin = admin._id;
    organization.members.push(admin._id);
    organization.staff.push({
      user: admin._id,
      role: "orgAdmin",
      assignedAt: new Date()
    });

    await organization.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Populate organization data for response
    const populatedOrg = await Organization.findById(organization._id)
      .select("-password -refreshToken")
      .populate("admin", "name email");

    await writeAudit({
      req,
      organization: populatedOrg,
      user: admin,
      action: "REGISTER_ORG",
      details: { 
        adminEmail: admin.email,
        emailDomain: finalEmailDomain,
        status: populatedOrg.status 
      },
    });

    return res.status(201).json(
      new ApiResponse(
        201, 
        { 
          organization: populatedOrg, 
          admin: {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
          }
        }, 
        `Organization registered successfully. Status: ${populatedOrg.status}`
      )
    );

  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    
    if (error.code === 11000) {
      throw new ApiError(409, "Organization with similar details already exists");
    }
    
    console.error("Organization registration error:", error);
    throw new ApiError(500, "Failed to register organization. Please try again.");
  } finally {
    session.endSession();
  }
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