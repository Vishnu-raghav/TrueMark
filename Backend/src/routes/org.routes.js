import { Router } from "express";

import {
  registerOrganization,
  assignRole,
  loginOrganization,
  refreshOrgAccessToken,
  logoutOrganization
} from "../controllers/organizationController.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/register", registerOrganization);

router.post("/login", loginOrganization);

router.post("/refresh-token", refreshOrgAccessToken);

router.post("/logout", verifyJWT, logoutOrganization);

router.post("/assign-role", verifyJWT, isAdmin, assignRole);

export default router;
