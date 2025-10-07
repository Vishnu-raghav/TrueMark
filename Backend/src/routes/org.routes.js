import { Router } from "express";

import {
  registerOrganization,
  assignRole,
  loginOrganization,
  refreshOrgAccessToken,
  logoutOrganization
} from "../controllers/organizationController.js";

import { verifyOrgJWT } from "../middlewares/org.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/org-register", registerOrganization);

router.post("/org-login", loginOrganization);

router.post("/refresh-token", refreshOrgAccessToken);

router.post("/org-logout", verifyOrgJWT, logoutOrganization);

router.post("/assign-role", verifyOrgJWT, isAdmin, assignRole);

export default router;
