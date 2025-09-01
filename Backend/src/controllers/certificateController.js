import { Certificate } from "../models/certificate.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { issueCertificate } from "../utils/hash.js"; 


const uploadCertificate = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { rollNo, certificateTitle, issueDate, issuedBy } = req.body;

  if ([rollNo, certificateTitle, issueDate, issuedBy].some(field => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

const certificateLocalPath = req.file?.path;

if (!certificateLocalPath) {
    throw new ApiError(400, "Certificate file is required");
}

const certificateImage = await uploadOnCloudinary(certificateLocalPath);

if (!certificateImage) {
    throw new ApiError(500, "Something went wrong while uploading the certificate");
}
  
   const { verificationId, hash } = issueCertificate({
    rollNo,
    certificateTitle,
    issueDate,
    issuedBy,
    userId,
  });

  const certificate = await Certificate.create({
    verificationId,
    rollNo,
    certificateTitle,
    issueDate,
    issuedBy,
    certificateFileURL: certificateImage.secure_url,
    userId,
    hash,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Certificate issued successfully", certificate));
});


const getStudentsCertificates = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const certificates = await Certificate.find({ userId })
    .populate("userId", "name email rollNo course branch -_id")
    .sort({ createdAt: -1 });

  if (!certificates || certificates.length === 0) {
    throw new ApiError(404, "No certificates found for this user");
  }

  return res.status(200).json(new ApiResponse(200, `${certificates.length} certificates found`, certificates));
});

const getMyCertificates = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const certificates = await Certificate.find({ userId })
    .populate("userId", "name email rollNo course branch -_id")
    .sort({ createdAt: -1 });

  if (!certificates || certificates.length === 0) {
    throw new ApiError(404, "No certificates found for this user");
  }

  return res.status(200).json(new ApiResponse(200, `${certificates.length} certificates found`, certificates));
});

const deleteCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;

  const certificate = await Certificate.findById(certificateId);
  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }

  const deletedFromCloudinary = await deleteFromCloudinary(certificate.certificateFileURL);
  if (!deletedFromCloudinary) {
    throw new ApiError(500, "Something went wrong while deleting the certificate from cloud");
  }

  await certificate.deleteOne();

  return res.status(200).json(new ApiResponse(200, "Certificate deleted successfully"));
});

const getUserByRollNo = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    throw new ApiError(400, "Roll number is required");
  }

  const users = await User.find({
    rollNo: { $regex: query, $options: "i" },
  })
    .limit(5)
    .select("_id name rollNo course branch");

  if (!users || users.length === 0) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, "User(s) found", users));
});

export {
  uploadCertificate,
  getStudentsCertificates,
  getMyCertificates,
  deleteCertificate,
  getUserByRollNo,
};
