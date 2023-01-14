import { Router } from 'express';
import {
  createAttendance,
  getAllAttendance,
  getAttendanceByDate,
  getUserAttendance,
} from '../controllers/attendanceController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = Router();

// isAuthenticatedUser, restrictTo('superadmin', 'admin'),

// routes
router.get('/', isAuthenticatedUser, restrictTo('superadmin', 'admin'), getAllAttendance);

//Get user routes
router.get('/user', isAuthenticatedUser, getUserAttendance);

//Get attendance by date
router.get('/date', isAuthenticatedUser, restrictTo('superadmin', 'admin'), getAttendanceByDate);

//Create attendance
router.post('/', isAuthenticatedUser, createAttendance);

export const AttendanceRoutes = router;
