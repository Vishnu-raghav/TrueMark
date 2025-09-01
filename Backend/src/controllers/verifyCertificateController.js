import { Certificate } from "../models/certificate.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateHMAC, compareHMAC } from "../utils/hash.js"; 

const verifyCertificateController = asyncHandler(async (req, res) => {
  let verificationId = req.params.verificationId;
  if (!verificationId || typeof verificationId !== "string") {
    throw new ApiError(400, "Verification ID is required");
  }
  verificationId = verificationId.trim();

  const certificate = await Certificate.findOne({ verificationId }).populate("userId", "_id name rollNo course branch");
  if (!certificate) {
    throw new ApiError(404, "Certificate not found or invalid");
  }

  const dataToVerify = JSON.stringify({
    rollNo: certificate.rollNo.trim(),
    certificateTitle: certificate.certificateTitle.trim(),
    issueDate: new Date(certificate.issueDate).toISOString(),
    issuedBy: certificate.issuedBy.trim(),
    userId: certificate.userId._id.toString() 
  });

  const inputHMAC = generateHMAC(dataToVerify);

  const isValid = compareHMAC(inputHMAC, certificate.hmac);

  return res.status(200).json(
    new ApiResponse(200, isValid ? "Certificate is valid" : "Certificate is invalid", {
      verificationId,
      valid: isValid,
      certificate: isValid ? certificate : null,
    })
  );
});

export { verifyCertificateController };

