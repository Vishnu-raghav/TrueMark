import { 
  uploadCertificate,
  getMyCertificates,
  getStudentsCertificates,
  getUserByRollNo,
  deleteCertificate 
} from "../controllers/certificateController.js";

import {
 verifyCertificateController
} from "../controllers/verifyCertificateController.js"

import { upload, optimizeImage } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin, isStudent } from "../middlewares/role.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/issueCertificate/:userId")
  .post(verifyJWT, isAdmin, upload.single("certificate"), optimizeImage,uploadCertificate);

router.route("/getMyCertificates")
  .get(verifyJWT, isStudent, getMyCertificates);

router.route("/getStudentsCertificates/:userId")
  .get(verifyJWT, isAdmin, getStudentsCertificates);

router.route("/getUserByRollNo")
  .get(verifyJWT, isAdmin, getUserByRollNo);

router.route("/deleteCertificate/:certificateId")
  .delete(verifyJWT, isAdmin, deleteCertificate);

router.route("/verifyCertificate/:verificationId")
    .get(verifyCertificateController);

export default router;
