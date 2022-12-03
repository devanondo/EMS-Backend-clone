import { Router } from 'express';
import {
  getHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from '../controllers/HolidayController.js';
import { holidayValidateRules } from '../middleware/validators/holidayValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
router.get('/', getHolidays);
router.post('/', holidayValidateRules(), validate, createHoliday);
router.put('/:id', updateHoliday);
router.delete('/:id', deleteHoliday);

export const HolidayRoutes = router;
