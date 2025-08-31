import {uploadCertificate,getMyCertificates,getStudentsCertificates,getUserByRollNo,deleteCertificate} from "../controllers/certificateController.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router()

router.route("/issueCertificate").post(verifyJWT,upload.single("certificate"),uploadCertificate)
router.route("/getMyCertificates").get(verifyJWT,getMyCertificates)
router.route("/getStudentsCertificates/:rollNo").get(verifyJWT,getStudentsCertificates)
router.route("/getUserByRollNo/:rollNo").get(verifyJWT,getUserByRollNo)
router.route("/deleteCertificate/:certificateId").delete(verifyJWT,deleteCertificate)   

export default router       

