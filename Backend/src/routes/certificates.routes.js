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
 * Anyone can verify a certificate using its ID.
 */
router.get("/verify/:certificateId", verifyCertificateController);

/**
 * ISSUE Certificate (Organization Admin only)
 * Allows organization admins to issue certificates to users.
 */
router.post(
  "/issue/:userId",
  verifyOrgJWT,
  isAdmin,
  upload.single("certificate"),
  optimizeImage,
  createCertificate
);

/**
 * LIST Issued Certificates (Organization-level)
 * Shows all certificates issued by the logged-in organization.
 */
router.get("/issued", verifyOrgJWT, listCertificates);

/**
 * LIST User Certificates (User-level)
 * Shows all certificates received by the logged-in user.
 */
router.get("/my", verifyJWT, listUserCertificates);

/**
 * GET Certificate by ID (User or Org)
 * Fetch a specific certificate by its ID.
 */
router.get("/:certificateId", verifyJWT, getCertificate);

/**
 * DELETE Certificate (Admin only)
 * Delete a certificate — accessible only to organization admins.
 */
router.delete("/:certificateId", verifyOrgJWT, isAdmin, deleteCertificate);

export default router;
