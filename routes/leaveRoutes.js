import { Router } from 'express';
import { getLeaves, createLeave, updateLeave, deleteLeave } from '../controllers/LeaveController.js';


const router = Router();

// routes
router.get('/', getLeaves);
router.post('/', createLeave);
router.put('/:id', updateLeave);
router.delete('/:id', deleteLeave);

export const leaveRoutes = router;