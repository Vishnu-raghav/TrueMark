import express from 'express';
import { getOrgStudents, searchStudents, getStudentsCount } from '../controllers/orgStudents.controller.js';
import { orgVerifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected routes
router.use(orgVerifyJWT);

router.get('/', getOrgStudents);
router.get('/search', searchStudents);
router.get('/count', getStudentsCount);

export default router;