// import { Router } from "express";
// import {
//   createCertificate,
//   deleteCertificate,
//   getCertificate,
//   listCertificates
// } from "../controllers/certificateController.js";

// import { verifyCertificateController } from "../controllers/verifyCertificateController.js";
// import { upload, optimizeImage } from "../middlewares/multer.middleware.js";
// import { verifyOrgJWT } from "../middlewares/org.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { isAdmin, isIssuer, isMember } from "../middlewares/role.middleware.js";

// const router = Router();

// /**
//  * VERIFY Certificate (Public)
//  * GET /api/v1/certificates/verify/:certificateId
//  */
// router.get(
//   "/verify/:certificateId",
//   verifyCertificateController
// );

// /**
//  * ISSUE Certificate
//  * POST /api/v1/certificates/issue/:userId
//  */
// router.post(
//   "/issue/:userId",
//   verifyOrgJWT,
//   isAdmin,
//   upload.single("certificate"),
//   optimizeImage,
//   createCertificate
// );

// /**
//  * GET My Certificates (Member only)
//  * GET /api/v1/certificates/my
//  */
// router.get(
//   "/my",
//   verifyJWT,
//   isMember,
//   listCertificates
// );

// /**
//  * GET Certificate by ID
//  * GET /api/v1/certificates/:certificateId
//  */
// router.get(
//   "/:certificateId",
//   verifyJWT,
//   getCertificate
// );

// /**
//  * DELETE Certificate
//  * DELETE /api/v1/certificates/:certificateId
//  */
// router.delete(
//   "/:certificateId",
//   verifyJWT,
//   isAdmin,
//   deleteCertificate
// );

// export default router;
import { Router } from "express";
import {
  createCertificate,
  deleteCertificate,
  getCertificate,
  listCertificates
} from "../controllers/certificateController.js";

import { verifyCertificateController } from "../controllers/verifyCertificateController.js";
import { upload, optimizeImage } from "../middlewares/multer.middleware.js";
import { verifyOrgJWT } from "../middlewares/org.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin, isIssuer, isMember } from "../middlewares/role.middleware.js";

const router = Router();

/**
 * VERIFY Certificate (Public)
 */
router.get("/verify/:certificateId", verifyCertificateController);

/**
 * ISSUE Certificate (Org admin only)
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
 * GET My Certificates (Member only)
 */
router.get("/my", verifyJWT, isMember, listCertificates);

/**
 * GET Certificate by ID
 */
router.get("/:certificateId", verifyJWT, getCertificate);

/**
 * DELETE Certificate (Admin only)
 */
router.delete("/:certificateId", verifyJWT, isAdmin, deleteCertificate);

export default router;
