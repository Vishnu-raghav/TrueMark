import { Router } from "express";
import {
  registerOrganization,
  assignRole,
  loginOrganization,
  refreshOrgAccessToken,
  logoutOrganization,
  getOrganization
} from "../controllers/organizationController.js";
import { verifyOrgJWT } from "../middlewares/org.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = Router();

// Public routes
router.post("/register", registerOrganization); // ✅ Better naming
router.post("/login", loginOrganization); // ✅ Better naming
router.post("/refresh-token", refreshOrgAccessToken);

// Protected routes (Organization auth required)
router.post("/logout", verifyOrgJWT, logoutOrganization); // ✅ Better naming
router.get("/profile", verifyOrgJWT, getOrganization); // ✅ NEW - Get org details

// Admin only routes
router.post("/assign-role", verifyOrgJWT, isAdmin, assignRole);

export default router;