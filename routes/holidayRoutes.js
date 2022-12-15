import { Router } from 'express';
import {
  getHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from '../controllers/HolidayController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { holidayValidateRules } from '../middleware/validators/holidayValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
// router.get('/', isAuthenticatedUser, restrictTo('admin', 'user'), getHolidays);
// router.post('/', isAuthenticatedUser, restrictTo('admin'), holidayValidateRules(), validate, createHoliday);
// router.put('/:id', isAuthenticatedUser, restrictTo('admin'), updateHoliday);
// router.delete('/:id', isAuthenticatedUser, restrictTo('admin'), deleteHoliday);


router.get('/', isAuthenticatedUser, getHolidays);
router.post('/', holidayValidateRules(), validate, isAuthenticatedUser, restrictTo('admin', 'superadmin'), createHoliday);
router.put('/:id', isAuthenticatedUser, restrictTo('admin', 'superadmin'), updateHoliday);
router.delete('/:id', isAuthenticatedUser, restrictTo('admin', 'superadmin'), deleteHoliday);

export const HolidayRoutes = router;
