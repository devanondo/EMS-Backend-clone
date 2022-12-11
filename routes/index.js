import { Router } from 'express';
import { clientRoute } from './clientRoute.js';
import { demoRoutes } from './demoRoutes.js';

import { projectRoutes } from './projectRoutes.js';
import { leaveRoutes } from './leaveRoutes.js';
import { HolidayRoutes } from './holidayRoutes.js';
import { AttendanceRoutes } from './attendanceRoutes.js';

import { userRoute } from './userRoute.js';


const router = Router();

router.use('/demo', demoRoutes);
router.use('/project', projectRoutes);
router.use('/leave', leaveRoutes);
router.use('/total-leave', leaveRoutes);
router.use('/holiday', HolidayRoutes);
router.use('/attendance', AttendanceRoutes);


// User route
router.use('/user', userRoute);

// Client Route
router.use('/client', clientRoute);

export default router;
