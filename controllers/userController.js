import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { saveToken } from '../utils/saveToken.js';

//Register user
export const registerUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const isExistUser = await User.findOne({ email: email });

  if (isExistUser) {
    next(new AppError('Email already exists!', 403));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashedPassword });

  saveToken(user, 200, res);
});

//Update user
export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return next(new AppError('Employee not found!', 403));
  }

  await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    status: 'success',
    message: 'User Updated successfully',
  });
});

//Login user
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please enter valid email & password', 304));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new AppError('User not found!', 403));

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) return next(new AppError('Wrong password'), 304);

  saveToken(user, 200, res);
});

//Logout User
export const logout = catchAsync(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged Out Successfully',
  });
});

//Get  User
export const getAUser = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const filters = {};

  if (id) {
    filters._id = id;
  }

  const users = await User.find(filters).lean().sort({ updatedAt: -1 });

  if (!users) {
    return next(new AppError('User not found!', 403));
  }

  res.status(201).json({
    status: 'success',
    data: users,
  });
});

//Change User Role
export const changeUserRole = catchAsync(async (req, res, next) => {
  const { id, role } = req.query;

  const filter = {};
  if (id) {
    filter._id = id;
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { role: role } },
    {
      new: true,
      runValidators: 'true',
      useFindAndModify: 'false',
    }
  );

  if (!user) {
    return next(new AppError('Internal Server Error', 500));
  }
  res.status(200).json({
    status: 'success',
    message: 'Role updated successfully',
  });
});
