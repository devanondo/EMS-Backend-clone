import { User } from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

//Register user
export const registerUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.create({ email, password });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    user,
  });
});

//Get User
export const getAllUser = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    users,
  });
});
