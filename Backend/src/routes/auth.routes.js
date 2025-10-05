import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  registerOrganization,
  changeCurrentPassword,
  getCurrentUser,
  assignIssuer,
  loginOrganization
} from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/register-organization", registerOrganization);
router.post("/login", loginUser);
router.post("/login-organization", loginOrganization);
router.post("/refreshToken", refreshAccessToken);

router.post("/logout", verifyJWT, logoutUser);
router.post("/changePassword", verifyJWT, changeCurrentPassword);
router.get("/getCurrentUser", verifyJWT, getCurrentUser);

router.post("/assign-issuer", verifyJWT, isAdmin, assignIssuer);

export default router;
