import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Certificate } from "../models/certificate.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { generateHMAC } from "../utils/hash.js";
import { nanoid } from "nanoid";
import { AuditLog } from "../models/AuditLog.model.js";
import mongoose from "mongoose";

/**
 * Helper for writing audit log
 */
const writeAudit = async ({ req, user = null, organization = null, action, details = {}, severity = "INFO" }) => {
  try {
    await AuditLog.create({
      organization: organization ? organization._id || organization : user?.organization || null,
      user: user ? user._id || user : null,
      action,
      details,
      ipAddress: req?.ip || (req?.headers && req.headers["x-forwarded-for"]) || null,
      userAgent: req?.headers?.["user-agent"] || null,
      severity,
    });
  } catch (err) {
    console.error("Audit log write failed:", err.message);
  }
};

const createCertificate = asyncHandler(async (req, res) => {
  const { title, description, expiryDate, metaData } = req.body;
  const recipientId = req.params.userId;

  if (!title || !recipientId) throw new ApiError(400, "Title and recipientId are required");

  const recipient = await User.findById(recipientId);
  if (!recipient) throw new ApiError(404, "Recipient not found");

  const certificateFile = req.file;
  if (!certificateFile) throw new ApiError(400, "Certificate file is required");

  const uploadedFile = await uploadOnCloudinary(certificateFile.path);
  if (!uploadedFile?.secure_url) throw new ApiError(500, "Failed to upload certificate file");

  const certificateId = nanoid(8);
  const issueDate = new Date().toISOString();

  const dataToHash = JSON.stringify({
    title,
    recipient: recipient._id.toString(),
    issuedBy: req.user.organization.toString(),
    issueDate,
  });

  const verificationHash = generateHMAC(dataToHash);

  // ✅ Create certificate
  const certificate = await Certificate.create({
    title,
    description,
    certificateId,
    verificationHash,
    issueDate,
    expiryDate,
    recipient: recipientId, // String format mein hi rahega
    issuedBy: req.user.organization,
    fileUrl: uploadedFile.secure_url,
    metaData,
  });

  // ✅ FIX: User ke certificates array mein bhi add karo
  await User.findByIdAndUpdate(
    recipientId,
    { 
      $push: { certificates: certificate._id } 
    }
  );

  console.log("✅ Certificate created and added to user's certificates array");

  await writeAudit({
    req,
    user: req.user,
    organization: req.user.organization,
    action: "ISSUE_CERTIFICATE",
    details: { certificateId, recipient: recipient.email },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, certificate, "Certificate issued successfully"));
});




/**
 * DELETE Certificate
 */
const deleteCertificate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const certificate = await Certificate.findById(id);
  if (!certificate) throw new ApiError(404, "Certificate not found");

  if (certificate.fileUrl) {
    const deletedFromCloudinary = await deleteFromCloudinary(certificate.fileUrl);
    if (!deletedFromCloudinary) {
      throw new ApiError(500, "Failed to delete certificate from Cloudinary");
    }
  }

  await certificate.deleteOne();

  await writeAudit({
    req,
    user: req.user,
    organization: req.user.organization,
    action: "DELETE_CERTIFICATE",
    details: { certificateId: certificate.certificateId },
  });

  return res.status(200).json(new ApiResponse(200, {}, "Certificate deleted successfully"));
});

/**
 * GET Certificate by ID
 */
const getCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id)
    .populate("recipient", "name email")
    .populate("issuedBy", "name email");

  if (!certificate) throw new ApiError(404, "Certificate not found");

  await writeAudit({
    req,
    user: req.user,
    organization: req.user.organization,
    action: "VIEW_CERTIFICATE",
    details: { certificateId: certificate.certificateId },
  });

  return res.status(200).json(new ApiResponse(200, certificate, "Certificate fetched successfully"));
});

/**
 * LIST Certificates (organization-level)
 */
const listCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find({ issuedBy: req.user.organization })
    .populate("recipient", "name email");

  return res.status(200).json(new ApiResponse(200, certificates, "Certificates list fetched successfully"));
});

/**
 * LIST User Certificates - FIXED VERSION
 */
const listUserCertificates = asyncHandler(async (req, res) => {
  console.log("=== 🔍 DEBUG: listUserCertificates ===");
  console.log("User ID:", req.user._id);
  console.log("User ID string:", req.user._id.toString());

  try {
    // ✅ FIX: Use STRING comparison since recipient is stored as string
    const userIdString = req.user._id.toString();
    
    const certificates = await Certificate.find({ recipient: userIdString })
      .populate("issuedBy", "name email")
      .sort({ issueDate: -1 });

    console.log("🔍 Certificates found with STRING comparison:", certificates.length);
    
    if (certificates.length > 0) {
      certificates.forEach((cert, index) => {
        console.log(`✅ Certificate ${index + 1}:`, {
          id: cert._id,
          title: cert.title,
          recipient: cert.recipient,
          recipientType: typeof cert.recipient
        });
      });
    } else {
      console.log("❌ No certificates found with string comparison");
      
      // Debug: Check all certificates in DB
      const allCerts = await Certificate.find({});
      console.log("📊 All certificates in DB:", allCerts.map(c => ({
        id: c._id,
        title: c.title,
        recipient: c.recipient,
        recipientType: typeof c.recipient
      })));
    }

    return res.status(200).json(
      new ApiResponse(200, certificates, "User certificates fetched successfully")
    );

  } catch (error) {
    console.error("❌ Error in listUserCertificates:", error);
    throw new ApiError(500, "Failed to fetch user certificates: " + error.message);
  }
});

export { 
  createCertificate, 
  deleteCertificate, 
  getCertificate, 
  listCertificates, 
  listUserCertificates 
};












