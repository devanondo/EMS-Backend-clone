import { Departments } from '../models/departmentModel.js';
import { Designations } from '../models/designationModel.js';
import { Roles } from '../models/roleModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

//Create Role
export const createRole = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.creator = _id;

  const data = await Roles.create(req.body);

  if (!data) {
    return next(new AppError('Internal Server Error'));
  }
  res.status(200).json({
    status: 'success',
    message: 'Role Created Successfully',
  });
});

//Get all Role
export const getAllRole = catchAsync(async (req, res, next) => {
  const roles = await Roles.find()
    .lean()
    .sort({ updatedAt: -1 })
    .populate('creator', ['username', 'role']);

  res.status(200).json({
    status: 'success',
    data: roles,
  });
});

//Update Role
export const updateRole = catchAsync(async (req, res, next) => {
  const role = await Roles.findById(req.query.id);
  if (!role) return next(new AppError('Role not found', 404));

  await Roles.findByIdAndUpdate(
    req.query.id,
    { title: req.query.role },
    {
      new: true,
      runValidators: 'true',
      useFindAndModify: 'false',
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Role updated successfully',
  });
});

//Delete Role
export const deleteRole = catchAsync(async (req, res, next) => {
  const role = await Roles.findById(req.query.id);
  if (!role) return next(new AppError('Role not found', 404));

  await Roles.findByIdAndDelete(req.query.id);

  res.status(200).json({
    status: 'success',
    message: 'Role Deleted successfully',
  });
});

// -----------DESIGNATION------------

//Create designation
export const createDesignation = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.creator = _id;

  const data = await Designations.create(req.body);

  if (!data) {
    return next(new AppError('Internal Server Error'));
  }
  res.status(200).json({
    status: 'success',
    message: 'Designation Created Successfully',
  });
});

//Get all designation
export const getAllDesignation = catchAsync(async (req, res, next) => {
  const designation = await Designations.find()
    .lean()
    .sort({ updatedAt: -1 })
    .populate('creator', ['username', 'role']);

  res.status(200).json({
    status: 'success',
    data: designation,
  });
});

//Update designation
export const updateDesignation = catchAsync(async (req, res, next) => {
  const designation = await Designations.findById(req.query.id);
  if (!designation) return next(new AppError('Designation not found', 404));

  await Designations.findByIdAndUpdate(
    req.query.id,
    { title: req.query.designation },
    {
      new: true,
      runValidators: 'true',
      useFindAndModify: 'false',
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Designation updated successfully',
  });
});

//Delete designation
export const deleteDesignation = catchAsync(async (req, res, next) => {
  const designation = await Designations.findById(req.query.id);
  if (!designation) return next(new AppError('Designation not found', 404));

  await Designations.findByIdAndDelete(req.query.id);

  res.status(200).json({
    status: 'success',
    message: 'Designation Deleted successfully',
  });
});

// ----------DEPARTMENT------------

//Create Department
export const createDepartment = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  req.body.creator = _id;

  const data = await Departments.create(req.body);

  if (!data) {
    return next(new AppError('Internal Server Error'));
  }
  res.status(200).json({
    status: 'success',
    message: 'Department Created Successfully',
  });
});

//Get all department
export const getAllDepartment = catchAsync(async (req, res, next) => {
  const department = await Departments.find()
    .lean()
    .sort({ updatedAt: -1 })
    .populate('creator', ['username', 'role']);

  res.status(200).json({
    status: 'success',
    data: department,
  });
});

//Update Department
export const updateDepartment = catchAsync(async (req, res, next) => {
  const department = await Departments.findById(req.query.id);
  if (!department) return next(new AppError('Role not found', 404));

  await Departments.findByIdAndUpdate(
    req.query.id,
    { title: req.query.department },
    {
      new: true,
      runValidators: 'true',
      useFindAndModify: 'false',
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Role updated successfully',
  });
});

//Delete Department
export const deleteDepartment = catchAsync(async (req, res, next) => {
  const role = await Departments.findById(req.query.id);
  if (!role) return next(new AppError('Department not found', 404));

  await Departments.findByIdAndDelete(req.query.id);

  res.status(200).json({
    status: 'success',
    message: 'Department Deleted successfully',
  });
});
