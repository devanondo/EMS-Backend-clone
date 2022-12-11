import { Router } from 'express';
import {
  createDepartment,
  createDesignation,
  createRole,
  deleteDepartment,
  deleteDesignation,
  getAllDepartment,
  getAllDesignation,
  getAllRole,
  updateDepartment,
  updateDesignation,
  updateRole,
} from '../controllers/extraController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = Router();

//create a new ROLE
router.post('/role', isAuthenticatedUser, restrictTo('superadmin'), createRole);

//Get all Roles
router.get('/role', isAuthenticatedUser, restrictTo('superadmin'), getAllRole);

//Update role
router.put('/role', isAuthenticatedUser, restrictTo('superadmin'), updateRole);

//Delete role
router.delete('/role', isAuthenticatedUser, restrictTo('superadmin'), deleteDesignation);

// ---------------DESIGNATION-----------------

//create a new Designation
router.post('/designation', isAuthenticatedUser, restrictTo('superadmin'), createDesignation);

//Get all Designation
router.get('/designation', isAuthenticatedUser, restrictTo('superadmin'), getAllDesignation);

//Update Designation
router.put('/designation', isAuthenticatedUser, restrictTo('superadmin'), updateDesignation);

//Delete Designation
router.delete('/designation', isAuthenticatedUser, restrictTo('superadmin'), deleteDesignation);

// ---------------DEPARTMENT-----------------

//create a new Departments
router.post('/department', isAuthenticatedUser, restrictTo('superadmin'), createDepartment);

//Get all Departments
router.get('/department', isAuthenticatedUser, restrictTo('superadmin'), getAllDepartment);

//Update Departments
router.put('/department', isAuthenticatedUser, restrictTo('superadmin'), updateDepartment);

//Delete Departments
router.delete('/department', isAuthenticatedUser, restrictTo('superadmin'), deleteDepartment);

export const extraRoute = router;
