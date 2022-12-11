import { Router } from 'express';
import {
  getAttendances,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from '../controllers/attendanceController.js';
import { attendanceValidateRules } from '../middleware/validators/attendanceValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
router.get('/', getAttendances);
router.post('/', attendanceValidateRules(), validate, createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);



export const AttendanceRoutes = router;
