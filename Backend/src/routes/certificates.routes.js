import { Router } from "express";
import { 
  createCertificate,
  deleteCertificate,
  getCertificate,
  listCertificates
} from "../controllers/certificateController.js";

import { verifyCertificateController } from "../controllers/verifyCertificateController.js";
import { upload, optimizeImage } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin, isIssuer, isMember } from "../middlewares/role.middleware.js";

const router = Router();

/**
 * ISSUE Certificate
 * POST /api/v1/certificates/issue/:userId
 */
router.post(
  "/issue/:userId",
  verifyJWT,
  isIssuer,
  upload.single("certificate"),
  optimizeImage,
  createCertificate
);

/**
 * GET My Certificates
 * GET /api/v1/certificates/my
 */
router.get(
  "/my",
  verifyJWT,
  isMember,
  listCertificates
);

router.get(
  "/:certificateId",
  verifyJWT,
  getCertificate
);

router.delete(
  "/:certificateId",
  verifyJWT,
  isAdmin,
  deleteCertificate
);


router.get(
  "/verify/:certificateId",
  verifyCertificateController
);

export default router;
