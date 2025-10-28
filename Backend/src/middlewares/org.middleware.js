import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Organization } from "../models/Organization.model.js";
// import { User } from "../models/user.model.js";

export const verifyOrgJWT = asyncHandler(async (req, _, next) => {
  const token = req.cookies?.orgAccessToken || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized — token missing");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const org = await Organization.findById(decoded._id).populate("admin");
    if (!org) throw new ApiError(401, "Invalid token — organization not found");

    req.organization = org;

    // Inject admin info into req.user for role checking
    req.user = {
      _id: org.admin?._id || null,
      email: org.admin?.email || null,
      role: org.admin?.role || "orgAdmin", 
      organization: org._id
    };

    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired organization token");
  }
});
