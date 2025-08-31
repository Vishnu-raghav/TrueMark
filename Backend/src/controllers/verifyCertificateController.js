
import { compareHash } from "../utils/certificateUtils.js";
import { Certificate } from "../models/certificate.model.js";

const verifyCertificateController = asyncHandler(async (req, res) => {
  const { verificationId } = req.query; 
  const certificate = await Certificate.findOne({ verificationId });
  if (!certificate) {
    throw new ApiError(404, "Certificate not found or invalid");
  }

  const dataToVerify = JSON.stringify({
    rollNo: certificate.rollNo,
    certificateTitle: certificate.certificateTitle,
    issueDate: certificate.issueDate,
    issuedBy: certificate.issuedBy,
    userId: certificate.userId,
  });
  const inputHash = generateHash(dataToVerify);

  const isValid = compareHash(inputHash, certificate.hash);

  return res.status(200).json(
    new ApiResponse(200, isValid ? "Certificate is valid " : "Certificate is invalid", {
      verificationId,
      valid: isValid,
      certificate: isValid ? certificate : null,
    })
  );
});

export { verifyCertificateController };
