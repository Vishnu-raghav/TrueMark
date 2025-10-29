import { Router } from "express";
import {
  registerOrganization,
  assignRole,
  loginOrganization,
  refreshOrgAccessToken,
  logoutOrganization,
  getOrganization,
  getOrgStudents,
  searchStudents,
  getStudentsCount,
  addStudentToOrg,
  fixAllStudents,
} from "../controllers/organizationController.js";
import { verifyOrgJWT } from "../middlewares/org.middleware.js";
import { isAdmin, isOrgAdminOrIssuer } from "../middlewares/role.middleware.js";

const router = Router();

// Public routes
router.post("/register", registerOrganization); 
router.post("/login", loginOrganization); 
router.post("/refresh-token", refreshOrgAccessToken);

// Protected routes (Organization auth required)
router.post("/logout", verifyOrgJWT, logoutOrganization);
router.get("/profile", verifyOrgJWT, getOrganization); 

// ✅ ADD STUDENTS ROUTES HERE
router.get("/students", verifyOrgJWT, isOrgAdminOrIssuer, getOrgStudents);
router.get("/students/search", verifyOrgJWT, isOrgAdminOrIssuer, searchStudents);
router.get("/students/count", verifyOrgJWT, isOrgAdminOrIssuer, getStudentsCount);
router.route("/add-student").post(verifyOrgJWT, addStudentToOrg);
router.route("/fix-students").post(verifyOrgJWT, fixAllStudents)

// Admin only routes
router.post("/assign-role", verifyOrgJWT, isAdmin, assignRole);

export default router;