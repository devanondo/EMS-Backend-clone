import { Router } from 'express';
import {
  changeTaskStatus,
  createTask,
  getProjectTask,
  getTask,
  getUserTask,
  updateTask,
} from '../controllers/taskController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = Router();

router.post('/', isAuthenticatedUser, createTask);
router.get('/', isAuthenticatedUser, getTask);
router.put('/', isAuthenticatedUser, changeTaskStatus);
router.put('/update', isAuthenticatedUser, updateTask);
router.get('/user', isAuthenticatedUser, getUserTask);
router.get('/project', isAuthenticatedUser, getProjectTask);

export const taskRoute = router;
