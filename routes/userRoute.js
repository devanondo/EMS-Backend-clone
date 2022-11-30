import { Router } from 'express';
import { createDemo, getDemos } from '../controllers/demoController.js';
import { getAllUser, registerUser } from '../controllers/userController.js';
import { userValidateRules } from '../middleware/validators/userValidator.js';
import { validate } from '../middleware/validators/validateResult.js';

const router = Router();

// routes
router.get('/', getDemos);
router.post('/', userValidateRules(), validate, createDemo);

//User routes
//Create or Register User
router.post('/register', userValidateRules(), registerUser);

//Get All User
router.get('/all', userValidateRules(), getAllUser);

export const userRoute = router;
