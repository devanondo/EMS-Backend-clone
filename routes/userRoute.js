import { Router } from 'express';
import {
  addEducation,
  deleteEducation,
  deleteUser,
  getAUser,
  login,
  loginUser,
  logout,
  registerUser,
  updateAvatar,
  updateUser,
  updateUserRole,
} from '../controllers/userController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { userRegisterValidator } from '../middleware/validators/userValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// User routes
// Create or Register User
router.post(
  '/register',
  isAuthenticatedUser,
  restrictTo('admin', 'superadmin'),
  userRegisterValidator(),
  validate,
  registerUser
);

// Get  user
router.get('/', isAuthenticatedUser, getAUser);

//Update users
router.put('/', isAuthenticatedUser, restrictTo('admin', 'superadmin'), updateUser);

// Update user role
router.put('/role', isAuthenticatedUser, restrictTo('admin', 'superadmin'), updateUserRole);

// Delete user
router.delete('/', isAuthenticatedUser, restrictTo('admin', 'superadmin'), deleteUser);

// add education for user
router.post('/education', addEducation);

// Delete Education
router.delete('/education', isAuthenticatedUser, deleteEducation);

// Get  user
router.get('/', getAUser);

// Get logged in user
router.get('/self', isAuthenticatedUser, loginUser);

// Login user
router.post('/login', login);

// Logout user
router.post('/logout', logout);

// Change user role --admin
// router.patch('/role', isAuthenticatedUser, restrictTo('superadmin', 'admin'), changeUserRole);

//Update employee avatar
router.post('/avatar', isAuthenticatedUser, updateAvatar);

export const userRoute = router;
