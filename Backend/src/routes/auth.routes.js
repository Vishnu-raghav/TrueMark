import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  changeCurrentPassword,
  getCurrentUser,
  updateUserProfile,
} from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { listUserCertificates } from "../controllers/certificateController.js";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refreshToken", refreshAccessToken);

// Protected routes
router.post("/logout", verifyJWT, logoutUser);
router.post("/changePassword", verifyJWT, changeCurrentPassword);
router.get("/getCurrentUser", verifyJWT, getCurrentUser);
router.put("/profile", verifyJWT, updateUserProfile); 
router.get("/mycertificates", verifyJWT, listUserCertificates);

export default router;