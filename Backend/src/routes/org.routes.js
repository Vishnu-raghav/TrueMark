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
router.post("/register", registerOrganization); 
router.post("/login", loginOrganization); 
router.post("/refresh-token", refreshOrgAccessToken);

// Protected routes (Organization auth required)
router.post("/logout", verifyOrgJWT, logoutOrganization);
router.get("/profile", verifyOrgJWT, getOrganization); 

// Admin only routes
router.post("/assign-role", verifyOrgJWT, isAdmin, assignRole);

export default router;