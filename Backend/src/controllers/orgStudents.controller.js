import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

// Get all students for organization
const getOrgStudents = asyncHandler(async (req, res) => {
  const organizationId = req.organization?._id || req.user?.organization;
  
  if (!organizationId) {
    throw new ApiError(401, "Organization not authenticated");
  }

  const students = await User.find({
    organization: organizationId,
    role: "member"
  }).select("name email phone dateOfBirth educationLevel status createdAt");

  return res.status(200).json(
    new ApiResponse(200, students, "Students fetched successfully")
  );
});

// Search students by name or email
const searchStudents = asyncHandler(async (req, res) => {
  const { query } = req.query;
  
  if (!query || query.trim() === "") {
    throw new ApiError(400, "Search query is required");
  }

  // Check both req.organization and req.user for organization ID
  const organizationId = req.organization?._id || req.user?.organization;
  
  if (!organizationId) {
    throw new ApiError(401, "Organization not authenticated");
  }

  const students = await User.find({
    organization: organizationId,
    role: "member",
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  }).select("name email phone status createdAt");

  return res.status(200).json(
    new ApiResponse(200, students, "Students search results")
  );
});

// Get students count
const getStudentsCount = asyncHandler(async (req, res) => {
  // Check both req.organization and req.user for organization ID
  const organizationId = req.organization?._id || req.user?.organization;
  
  if (!organizationId) {
    throw new ApiError(401, "Organization not authenticated");
  }

  const count = await User.countDocuments({
    organization: organizationId,
    role: "member"
  });

  return res.status(200).json(
    new ApiResponse(200, { count }, "Students count fetched successfully")
  );
});

export { getOrgStudents, searchStudents, getStudentsCount };