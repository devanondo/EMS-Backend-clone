import { Router } from 'express';
import {
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
} from '../controllers/LeaveController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { leaveValidateRules } from '../middleware/validators/leaveValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
router.get('/', isAuthenticatedUser, restrictTo('admin, user'), getLeaves);
router.post('/', isAuthenticatedUser, restrictTo('admin, user'), leaveValidateRules(), validate, createLeave);
router.put('/:id', isAuthenticatedUser, restrictTo('admin, user'), updateLeave);
router.delete('/:id', isAuthenticatedUser, restrictTo('admin, user'), deleteLeave);

export const leaveRoutes = router;
