import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Organization } from "../models/Organization.model.js";

export const verifyOrgJWT = asyncHandler(async (req, _, next) => {
  const token = req.cookies?.orgAccessToken || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized — token missing");

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const org = await Organization.findById(decoded._id);
  if (!org) throw new ApiError(401, "Invalid token — organization not found");

  req.organization = org;
  next();
});
