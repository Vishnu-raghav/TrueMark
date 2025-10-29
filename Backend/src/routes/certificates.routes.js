import { Router } from "express";
import {
  createCertificate,
  deleteCertificate,
  getCertificate,
  listCertificates,
  listUserCertificates,
} from "../controllers/certificateController.js";

import { verifyCertificateController } from "../controllers/verifyCertificateController.js";
import { upload, optimizeImage } from "../middlewares/multer.middleware.js";
import { verifyOrgJWT } from "../middlewares/org.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = Router();

/**
 * VERIFY Certificate (Public route)
 */
router.get("/verify/:certificateId", verifyCertificateController);

/**
 * ✅ FIXED: ISSUE Certificate - Remove userId parameter
 */
router.post(
  "/issue", // ✅ CHANGED: Remove /:userId
  verifyOrgJWT,
  isAdmin,
  upload.single("certificate"), // ✅ Field name: "certificate"
  optimizeImage,
  createCertificate
);

/**
 * LIST Issued Certificates (Organization-level)
 */
router.get("/issued", verifyOrgJWT, listCertificates);

/**
 * LIST User Certificates (User-level)
 */
router.get("/my", verifyJWT, listUserCertificates);

/**
 * GET Certificate by ID (User or Org)
 */
router.get("/:certificateId", verifyJWT, getCertificate);

/**
 * DELETE Certificate (Admin only)
 */
router.delete("/:certificateId", verifyOrgJWT, isAdmin, deleteCertificate);

export default router;