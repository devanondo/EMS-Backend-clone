import { Router } from 'express';
import {
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
} from '../controllers/LeaveController.js';
import { leaveValidateRules } from '../middleware/validators/leaveValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
router.get('/', getLeaves);
router.post('/', leaveValidateRules(), validate, createLeave);
router.put('/:id', updateLeave);
router.delete('/:id', deleteLeave);

export const leaveRoutes = router;
