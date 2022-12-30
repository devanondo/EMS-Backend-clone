import bcrypt from 'bcrypt';
import moment from 'moment';
import { User } from '../models/userModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { saveToken } from '../utils/saveToken.js';

// Register user
export const registerUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const isExistUser = await User.findOne({ email });
  const data = [
    {
      year: moment().year(),
      leaves: {
        cl: 0,
        el: 0,
        sl: 0,
      },
    },
  ];
  req.body.leave = data;

  if (isExistUser) {
    return next(new AppError('Email already exists!', 403));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  req.body.password = hashedPassword;
  const user = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    message: 'User Created Successfully',
  });
});

// Update user
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

  res.status(200).json({
    status: 'success',
    message: 'User Updated successfully',
  });
});

//Delete User
export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const user = await User.findById(id);
  if (!user) return next(AppError('User not found', 404));

  const roles = ['admin', 'superadmin'];

  if (roles.includes(user.role)) {
    return next(new AppError(`You cannot remove  ${user.role}`));
  }

  await User.findByIdAndDelete({ _id: id });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

//Update User role
export const updateUserRole = catchAsync(async (req, res, next) => {
  const { id, role } = req.query;

  await User.findByIdAndUpdate(
    { _id: id },
    { role: role },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Role updated successfully',
  });
});

//Add education
export const addEducation = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const user = await User.findById(id);
  if (!user) return next(new AppError('User not found!', 404));

  user.education.push(req.body);
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    message: 'Education Updated successfully',
    data: user,
  });
});

//Delete education
export const deleteEducation = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const edu = user.education.find((itm) => itm._id == req.query.id);

  if (!edu) return next(new AppError('Education not found!', 404));

  let newEducation = user.education.reduce((acc, cur) => {
    if (cur._id.toString() !== req.query.id.toString()) {
      acc.push(cur);
    }
    return acc;
  }, []);

  user.education = newEducation;
  user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    message: 'Education Updated successfully',
  });
});

// Update education
// export const editEducation = catchAsync(async (req, res, next) => {
//   const user = User.findById(req.user._id);

//   const edu = user.education.find((itm) => itm._id == req.query.id);

//   if (!edu) return next(new AppError('Education not found!', 404));

//   let isUpdate = User.findByIdAndUpdate(req.query.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.send(isUpdate);
// });

//Login user

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please enter valid email & password', 304));
  }

  const user = await User.findOne({ email }).select('password');

  if (!user) return next(new AppError('User not found!', 403));

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) return next(new AppError('Wrong password'), 304);

  saveToken(user, 200, res);
});

// Logout User
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

// Get  User
export const getAUser = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const filters = {};

  if (id) {
    filters._id = id;
  }

  const totalEmployee = await User.countDocuments();

  const apiFeatures = new ApiFeatures(User.find(filters).lean().sort({ updatedAt: -1 }), req.query)
    .searchEmployee()
    .pagination();

  const users = await apiFeatures.query;
  if (!users) {
    return next(new AppError('User not found!', 403));
  }

  res.status(201).json({
    status: 'success',
    data: users,
    count: totalEmployee,
  });
});

//Get login user
export const loginUser = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findById({ _id });
  if (!user) {
    return next(new AppError('Please login first!'));
  }
  res.status(200).json({
    status: 'success',
    data: user,
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
    { $set: { role } },
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
