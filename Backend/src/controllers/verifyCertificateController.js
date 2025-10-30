import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Certificate } from "../models/certificate.model.js";
import { VerificationLog } from "../models/verificationLog.model.js";
import { AuditLog } from "../models/AuditLog.model.js";
import { generateHMAC, compareHMAC } from "../utils/hash.js";
import mongoose from "mongoose";

/**
 * helper: write audit log
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
  } catch (e) {
    console.error("Audit write failed:", e.message);
  }
};

/**
 * Verify Certificate
 */
// verifyCertificateController.js - FIXED VERSION
const verifyCertificateController = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;
  if (!certificateId) throw new ApiError(400, "Certificate ID is required");

  console.log("🔍 Verifying Certificate ID:", certificateId);

  // ✅ FIX 1: Use proper population syntax
  const certificate = await Certificate.findOne({ certificateId })
    .populate("recipient", "name email")
    .populate("issuedBy", "name email") // ✅ Make sure this matches your Organization model
    .lean(); // ✅ Add lean() for better performance

  if (!certificate) {
    console.log("❌ Certificate not found with ID:", certificateId);
    throw new ApiError(404, "Certificate not found");
  }

  console.log("🔍 Certificate after population:", {
    issuedBy: certificate.issuedBy, // ✅ Check what we get after population
    recipient: certificate.recipient
  });

  // ✅ FIX 2: Better error handling for population issues
  if (!certificate.issuedBy) {
    console.log("⚠️ Population failed, trying manual population...");
    
    // Manual population if automatic fails
    const Organization = mongoose.model('Organization');
    const organization = await Organization.findById(certificate.issuedBy);
    
    if (organization) {
      certificate.issuedBy = organization;
    } else {
      throw new ApiError(500, "Certificate issuer organization not found");
    }
  }

  // ✅ FIX 3: Safe access to _id
  const dataToVerify = JSON.stringify({
    title: certificate.title,
    recipient: certificate.recipient._id.toString(),
    issuedBy: certificate.issuedBy._id.toString(), // ✅ Now this should work
    issueDate: new Date(certificate.issueDate).toISOString(),
  });

  console.log("🔍 Data for hash generation:", dataToVerify);

  const generatedHash = generateHMAC(dataToVerify);
  const isValid = compareHMAC(generatedHash, certificate.verificationHash);

  console.log("🔍 Hash comparison result:", {
    generated: generatedHash,
    stored: certificate.verificationHash,
    isValid: isValid
  });

  // Rest of the code remains same...
  let status = certificate.status;
  if (certificate.expiryDate && new Date(certificate.expiryDate) < new Date()) {
    status = "expired";
  }

  await VerificationLog.create({
    certificate: certificate._id,
    verifierId: req.user ? req.user._id : null,
    verifierEmail: req.user?.email || null,
    verifierName: req.user?.name || "Anonymous",
    verifierIp: req.ip,
    verifierDevice: req.headers["user-agent"],
    status,
    note: isValid ? "Certificate verified successfully" : "Invalid certificate",
  });

  await writeAudit({
    req,
    user: req.user || null,
    organization: certificate.issuedBy._id,
    action: "VERIFY_CERTIFICATE",
    details: { certificateId, valid: isValid, status },
  });

  return res.status(200).json(
    new ApiResponse(200, isValid ? "Certificate is valid" : "Certificate is invalid", {
      valid: isValid,
      status,
      certificate: isValid ? {
        ...certificate,
        verificationHash: undefined // ✅ Remove hash from response
      } : null,
    })
  );
});

export { verifyCertificateController };
