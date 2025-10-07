import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  changeCurrentPassword,
  getCurrentUser,
} from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { listUserCertificates } from "../controllers/certificateController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refreshToken", refreshAccessToken);

router.post("/logout", verifyJWT, logoutUser);
router.post("/changePassword", verifyJWT, changeCurrentPassword);
router.get("/getCurrentUser", verifyJWT, getCurrentUser);
router.get("/mycertificates", verifyJWT, listUserCertificates);



export default router;
