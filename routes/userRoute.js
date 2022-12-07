import { Router } from 'express';
import {
  addEducation,
  changeUserRole,
  deleteEducation,
  getAUser,
  login,
  loginUser,
  logout,
  registerUser,
  updateUser,
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
  restrictTo('admin'),
  userRegisterValidator(),
  validate,
  registerUser
);


// Get  user
router.get('/', isAuthenticatedUser, getAUser);

//Update users
router.put('/', isAuthenticatedUser, restrictTo('admin', 'user'), updateUser);

//add education for user
router.post('/education', addEducation);

//Delete Education
router.delete('/education', isAuthenticatedUser, deleteEducation);

//Get  user
router.get('/', getAUser);

//Get logged in user
router.get('/self', isAuthenticatedUser, loginUser);


// Login user
router.post('/login', login);

// Logout user
router.post('/logout', logout);

// Change user role --admin
router.patch('/role', isAuthenticatedUser, restrictTo('admin'), changeUserRole);

export const userRoute = router;
