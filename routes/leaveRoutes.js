import { Router } from 'express';
import {
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
} from '../controllers/LeaveController.js';
import { getTotalLeave, updateTotalLeave, createTotalLeave, clearTotalLeave } from '../controllers/totalLeaveController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { leaveValidateRules } from '../middleware/validators/leaveValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
// router.get('/', isAuthenticatedUser, restrictTo('admin, user'), getLeaves);
// router.post('/', isAuthenticatedUser, restrictTo('admin, user'), leaveValidateRules(), validate, createLeave);
// router.put('/:id', isAuthenticatedUser, restrictTo('admin, user'), updateLeave);
// router.delete('/:id', isAuthenticatedUser, restrictTo('admin, user'), deleteLeave);

router.get('/', getLeaves);
router.post('/', leaveValidateRules(), validate, createLeave);
router.put('/:id', updateLeave);
router.delete('/:id', deleteLeave);

// update total leave 
router.post('/total-leave', createTotalLeave);
router.get('/total-leave', getTotalLeave);
router.put('/total-leave/:id', updateTotalLeave);
router.put('/clear-total-leave/:id', clearTotalLeave);
export const leaveRoutes = router;
