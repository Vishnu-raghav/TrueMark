import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Organization } from "../models/Organization.model.js";
import { User } from "../models/user.model.js";
import { AuditLog } from "../models/AuditLog.model.js";

/**
 * Register Organization + Admin
 */
const registerOrganization = asyncHandler(async (req, res) => {
  const { orgName, orgEmail, adminName, adminEmail, adminPassword, type, address, phone, website } = req.body;

  if (![orgName, orgEmail, adminName, adminEmail, adminPassword].every(Boolean)) {
    throw new ApiError(400, "All fields required");
  }

  const existingOrg = await Organization.findOne({ $or: [{ name: orgName }, { email: orgEmail }] });
  if (existingOrg) throw new ApiError(400, "Organization already exists");

  const org = await Organization.create({ name: orgName, email: orgEmail, type, address, phone, website });

  const adminUser = await User.create({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: "orgAdmin",
    organization: org._id,
  });

  org.admin = adminUser._id;
  org.users.push(adminUser._id);
  await org.save();

  await AuditLog.create({
    organization: org._id,
    user: adminUser._id,
    action: "REGISTER_ORG",
    details: { info: "Organization registered successfully" },
  });

  return res.status(201).json(new ApiResponse(201, { org, adminUser }, "Organization registered successfully"));
});

/**
 * Login Organization (for super admin dashboard)
 */
const loginOrganization = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email & password required");

  const org = await Organization.findOne({ email }).select("+password");
  if (!org || !(await org.isPasswordCorrect(password))) throw new ApiError(401, "Invalid credentials");

  const accessToken = org.generateAccessToken();
  return res
    .status(200)
    .cookie("orgAccessToken", accessToken, { httpOnly: true })
    .json(new ApiResponse(200, { organization: org, accessToken }, "Organization logged in"));
});

export { registerOrganization, loginOrganization };
