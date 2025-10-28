import express from 'express';
import { getOrgStudents, searchStudents } from '../controllers/orgStudents.controller.js';
import { orgVerifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected routes
router.use(orgVerifyJWT);

router.get('/', getOrgStudents);
router.get('/search', searchStudents);

export default router;