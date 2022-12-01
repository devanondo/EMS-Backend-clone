import { Router } from 'express';
import { createDemo, getDemos } from '../controllers/demoController.js';
import {
  changeUserRole,
  getAllUser,
  getAUser,
  login,
  logout,
  registerUser,
  updateUser,
} from '../controllers/userController.js';
import { authorizeRole, isAuthenticatedUser } from '../middleware/auth.js';
import { userValidateRules } from '../middleware/validators/userValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
router.get('/', getDemos);
router.post('/', userValidateRules(), validate, createDemo);

//User routes
//Create or Register User
router.post(
  '/register',
  isAuthenticatedUser,
  authorizeRole('admin'),
  userValidateRules(),
  validate,
  registerUser
);

//Update users
router.put('/update', isAuthenticatedUser, updateUser);

//Get a user
router.get('/:id', isAuthenticatedUser, getAUser);

//Login user
router.post('/login', login);

//Logout user
router.post('/logout', logout);

//Change user role --admin
router.put('/role', isAuthenticatedUser, authorizeRole('admin'), changeUserRole);

//Get All User
router.get('/all', isAuthenticatedUser, getAllUser);

export const userRoute = router;
