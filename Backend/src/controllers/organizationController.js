import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Organization } from "../models/Organization.model.js";
import { User } from "../models/user.model.js";
import { AuditLog } from "../models/AuditLog.model.js";

/**
 * Register Organization + Default Admin
 */
const registerOrganization = asyncHandler(async (req, res) => {
  const { orgName, orgEmail, adminName, adminEmail, adminPassword, type, address, phone, website } = req.body;

  if (![orgName, orgEmail, adminName, adminEmail, adminPassword].every(Boolean)) {
    throw new ApiError(400, "All fields are required");
  }

  const existingOrg = await Organization.findOne({ $or: [{ name: orgName }, { email: orgEmail }] });
  if (existingOrg) throw new ApiError(400, "Organization already exists");

  const org = await Organization.create({ name: orgName, email: orgEmail, type, address, phone, website });

  const adminUser = await User.create({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: "orgAdmin", // Default admin role
    organization: org._id,
  });

  org.admin = adminUser._id;
  org.users.push(adminUser._id);
  await org.save();

  await AuditLog.create({
    organization: org._id,
    user: adminUser._id,
    action: "REGISTER_ORG",
    details: { info: "Organization registered with default admin" },
  });

  return res.status(201).json(new ApiResponse(201, { org, adminUser }, "Organization registered successfully"));
});

/**
 * Assign Role to User
 * Only superAdmin or orgAdmin can do this
 */
const assignRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) throw new ApiError(400, "User ID and role are required");
  if (!["member", "issuer", "orgAdmin"].includes(role)) throw new ApiError(400, "Invalid role");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Only superAdmin or orgAdmin of same org can assign role
  if (
    req.user.role !== "superAdmin" &&
    (req.user.role !== "orgAdmin" || String(user.organization) !== String(req.user.organization))
  ) {
    throw new ApiError(403, "You are not authorized to assign roles");
  }

  user.role = role;
  await user.save();

  await AuditLog.create({
    organization: user.organization,
    user: req.user._id,
    action: "ASSIGN_ROLE",
    details: { assignedTo: user.email, role },
  });

  return res.status(200).json(new ApiResponse(200, user, `Role ${role} assigned successfully`));
});

/**
 * Login Organization
 */
const loginOrganization = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password required");

  const org = await Organization.findOne({ email }).select("+password");
  if (!org || !(await org.isPasswordCorrect(password))) throw new ApiError(401, "Invalid credentials");

  const accessToken = org.generateAccessToken();
  return res
    .status(200)
    .cookie("orgAccessToken", accessToken, { httpOnly: true })
    .json(new ApiResponse(200, { organization: org, accessToken }, "Organization logged in"));
});

export { registerOrganization, loginOrganization, assignRole };
