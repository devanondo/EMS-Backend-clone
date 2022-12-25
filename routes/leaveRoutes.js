import { Router } from 'express';
import {
  createLeave,
  deleteLeave,
  getAllLeaves,
  getLeaves,
  getUserLeave,
  searchLeaves,
  updateLeave,
  updateStatus,
} from '../controllers/LeaveController.js';
import {
  createTotalLeave,
  deleteTotalLeave,
  getTotalLeave,
  updateTotalLeave,
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

//Create leave
router.post('/create', isAuthenticatedUser, createLeave);

//Update status
router.post('/update', isAuthenticatedUser, restrictTo('superadmin'), updateStatus);

//get all leaves
router.get('/', isAuthenticatedUser, getAllLeaves);

//Get user leaves
router.get('/user-leave', isAuthenticatedUser, getUserLeave);

// ------------------

router.get('/', isAuthenticatedUser, getLeaves);

router.get('/search-leave', searchLeaves);

router.post('/', leaveValidateRules(), validate, isAuthenticatedUser, createLeave);

router.put('/:id', isAuthenticatedUser, restrictTo('superadmin'), updateLeave);

router.delete('/:id', isAuthenticatedUser, restrictTo('superadmin'), deleteLeave);

// update total leave

//Create total/all leave
router.post('/all', isAuthenticatedUser, restrictTo('superadmin'), createTotalLeave);

//Get total/all leave
router.get('/all', isAuthenticatedUser, restrictTo('superadmin'), getTotalLeave);

//Update total/all leave
router.patch('/all', isAuthenticatedUser, restrictTo('superadmin'), updateTotalLeave);

//Delete total/all leave
router.delete('/all', isAuthenticatedUser, restrictTo('superadmin'), deleteTotalLeave);

export const leaveRoutes = router;
