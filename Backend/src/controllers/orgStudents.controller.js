import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

// Get all students for organization
const getOrgStudents = asyncHandler(async (req, res) => {
  const students = await User.find({
    organization: req.user.organization,
    role: "member"
  }).select("name email phone dateOfBirth educationLevel");

  return res.status(200).json(
    new ApiResponse(200, students, "Students fetched successfully")
  );
});

// Search students by name or email
const searchStudents = asyncHandler(async (req, res) => {
  const { query } = req.query;
  
  const students = await User.find({
    organization: req.user.organization,
    role: "member",
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  }).select("name email");

  return res.status(200).json(
    new ApiResponse(200, students, "Students search results")
  );
});

export { getOrgStudents, searchStudents };