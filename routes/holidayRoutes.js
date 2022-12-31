import { Router } from 'express';
import {
  createHoliday,
  deleteHoliday,
  getHolidays,
  updateHoliday,
} from '../controllers/holidayController.js';
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

//Get holidays for all users
router.get('/', isAuthenticatedUser, getHolidays);

//Create holiday
router.post(
  '/',
  holidayValidateRules(),
  validate,
  isAuthenticatedUser,
  restrictTo('admin', 'superadmin'),
  createHoliday
);

//Update holiday
router.put('/:id', isAuthenticatedUser, restrictTo('admin', 'superadmin'), updateHoliday);

//Delete holiday
router.delete('/:id', isAuthenticatedUser, restrictTo('admin', 'superadmin'), deleteHoliday);

export const HolidayRoutes = router;
