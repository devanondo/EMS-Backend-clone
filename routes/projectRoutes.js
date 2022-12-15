import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProjects,
  progressUpdate,
  updateProject,
} from '../controllers/ProjectController.js';
// import { demoValidateRules } from '../middleware/validators/demoValidator.js';
// import { validate } from '../middleware/validators/validateResult.js';
import { projectValidateRules } from '../middleware/validators/projectValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
router.get('/', getProjects);
router.post('/', projectValidateRules(), createProject, validate);
router.put('/:id', updateProject);
router.patch('/:id', progressUpdate);
router.delete('/:id', deleteProject);

export const projectRoutes = router;
