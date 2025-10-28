import express from 'express';
import { 
  getOrgStudents, 
  searchStudents, 
  getStudentsCount 
} from '../controllers/orgStudents.controller.js';
import { verifyOrgJWT } from '../middlewares/org.middleware.js';
import { isOrgAdminOrIssuer } from '../middlewares/role.middleware.js';

const router = express.Router();

// ✅ All routes require organization JWT and admin/issuer role
router.use(verifyOrgJWT, isOrgAdminOrIssuer);

router.get('/', getOrgStudents);
router.get('/search', searchStudents);
router.get('/count', getStudentsCount);

export default router;