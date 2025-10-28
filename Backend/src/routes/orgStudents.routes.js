import express from 'express';
import { getOrgStudents, searchStudents, getStudentsCount } from '../controllers/orgStudents.controller.js';
import { verifyOrgJWT } from '../middlewares/org.middleware.js';

const router = express.Router();

// Protected routes
router.use(verifyOrgJWT);

router.get('/', getOrgStudents);
router.get('/search', searchStudents);
router.get('/count', getStudentsCount);

export default router;