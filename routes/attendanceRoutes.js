import { Router } from 'express';
import {
  createAttendance,
  getAllAttendance,
  getUserAttendance,
} from '../controllers/attendanceController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = Router();

// isAuthenticatedUser, restrictTo('superadmin', 'admin'),

// routes
router.get('/', getAllAttendance);

//Get user routes
router.get('/user', isAuthenticatedUser, getUserAttendance);

//Create attendance
router.post('/', isAuthenticatedUser, createAttendance);

export const AttendanceRoutes = router;
