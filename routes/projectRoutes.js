import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProjectByEmployee,
  getProjects,
  progressUpdate,
  updateProject,
} from '../controllers/ProjectController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { projectValidateRules } from '../middleware/validators/projectValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
//Get Projects
router.get('/', isAuthenticatedUser, getProjects);

//Get project by user
router.get('/user', isAuthenticatedUser, getProjectByEmployee);

//Create Project
router.post('/', projectValidateRules(), validate, createProject);

//Update Project
router.put('/:id', isAuthenticatedUser, restrictTo('admin', 'superadmin', 'pm'), updateProject);

//Update Progress
router.patch('/:id', isAuthenticatedUser, progressUpdate);

//Delete Project
router.delete('/:id', isAuthenticatedUser, restrictTo('admin', 'superadmin', 'pm'), deleteProject);
// router.get('/', isAuthenticatedUser, restrictTo('admin, user'), getProjects);
// router.post(
//   '/',
//   isAuthenticatedUser,
//   restrictTo('admin'),
//   projectValidateRules(),
//   validate
//   createProject,
// );
// router.put('/:id', isAuthenticatedUser, restrictTo('admin'), updateProject);
// router.delete('/:id', isAuthenticatedUser, restrictTo('admin'), deleteProject);

export const projectRoutes = router;
