import { Router } from 'express';
import {
  changeUserRole,
  getAUser,
  login,
  logout,
  registerUser,
  updateUser,
} from '../controllers/userController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { restrictTo } from '../middleware/restrictTo.js';
import { userRegisterValidator } from '../middleware/validators/userValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

//User routes
//Create or Register User
router.post(
  '/register',
  isAuthenticatedUser,
  restrictTo('admin'),
  userRegisterValidator(),
  validate,
  registerUser
);

//Update users
router.put('/', isAuthenticatedUser, updateUser);

//Get  user
router.get('/', isAuthenticatedUser, getAUser);

//Login user
router.post('/login', login);

//Logout user
router.post('/logout', logout);

//Change user role --admin
router.patch('/role', isAuthenticatedUser, restrictTo('admin'), changeUserRole);

export const userRoute = router;
