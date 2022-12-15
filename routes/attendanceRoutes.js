import { Router } from 'express';
import {
  createAttendance,
  deleteAttendance,
  getAttendances,
  updateAttendance,
} from '../controllers/attendanceController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = Router();

// routes
router.get('/', getAttendances);
router.post('/', isAuthenticatedUser, createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);



export const AttendanceRoutes = router;
