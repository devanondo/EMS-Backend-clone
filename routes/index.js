import { Router } from 'express';
import { demoRoutes } from './demoRoutes.js';
import { projectRoutes } from './projectRoutes.js';
import { leaveRoutes } from './leaveRoutes.js';
import { HolidayRoutes } from './holidayRoutes.js';
import { AttendanceRoutes } from './attendanceRoutes.js';

const router = Router();

router.use('/demo', demoRoutes);
router.use('/project', projectRoutes);
router.use('/leave', leaveRoutes);
router.use('/holiday', HolidayRoutes);
router.use('/attendance', AttendanceRoutes);

export default router;
