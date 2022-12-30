import { Router } from 'express';
import {
  createAttendance,
  getAllAttendance,
  getUserAttendance,
} from '../controllers/attendanceController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = Router();

// routes
router.get('/', isAuthenticatedUser, restrictTo('superadmin', 'admin'), getAllAttendance);

//Get user routes
router.get('/user', isAuthenticatedUser, getUserAttendance);

//Create attendance
router.post('/', isAuthenticatedUser, createAttendance);

export const AttendanceRoutes = router;
