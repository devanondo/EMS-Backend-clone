import { Router } from 'express';
import {
  getLeaves,
  createLeave,
  searchLeaves,
  updateLeave,
  deleteLeave,
  getUserLeave,
} from '../controllers/LeaveController.js';
import {
  getTotalLeave,
  updateTotalLeave,
  // createTotalLeave,
  clearTotalLeave,
} from '../controllers/totalLeaveController.js';
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

router.get('/', isAuthenticatedUser, getLeaves);
router.get('/user-leave', isAuthenticatedUser,  getUserLeave);
router.get('/search-leave', searchLeaves)
router.post('/', leaveValidateRules(), validate, isAuthenticatedUser, createLeave);
router.put('/:id', isAuthenticatedUser, restrictTo('superadmin'), updateLeave);
router.delete('/:id', isAuthenticatedUser, restrictTo('superadmin'), deleteLeave);


// update total leave
// router.post('/total-leave', isAuthenticatedUser, createTotalLeave);
router.get('/total-leave', isAuthenticatedUser, getTotalLeave);
router.put('/total-leave/:id', isAuthenticatedUser, updateTotalLeave);
router.put('/clear-total-leave/:id', isAuthenticatedUser, clearTotalLeave);
export const leaveRoutes = router;
