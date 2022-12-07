import { Router } from 'express';
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from '../controllers/ProjectController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { projectValidateRules } from '../middleware/validators/projectValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
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

router.get('/',  getProjects);
router.post( '/', projectValidateRules(),validate,createProject );
router.put('/:id',  updateProject);
router.delete('/:id', deleteProject);

export const projectRoutes = router;
