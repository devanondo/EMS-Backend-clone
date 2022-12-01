import { Router } from 'express';
import { getAttendances, createAttendance, updateAttendance, deleteAttendance } from '../controllers/attendanceController.js';

const router = Router();

// routes
router.get('/', getAttendances);
router.post('/', createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export const AttendanceRoutes = router;