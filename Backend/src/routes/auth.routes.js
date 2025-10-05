import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser,
    registerOrganization,
    changeCurrentPassword,
    getCurrentUser
} from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/register-organization", registerOrganization);
router.post("/login", loginUser);
router.post("/refreshToken", refreshAccessToken);

router.post("/logout", verifyJWT, logoutUser);
router.post("/changePassword", verifyJWT, changeCurrentPassword);
router.get("/getCurrentUser", verifyJWT, getCurrentUser);

export default router;
