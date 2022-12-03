import { Client } from '../models/clientModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

//Create Client Account
export const createClient = catchAsync(async (req, res, next) => {
  const { name, email, designation, companyName } = req.body;

  const user = await Client.findOne({ email: email });
  if (user) return next(new AppError('Client already exists..!', 403));

  await Client.create({
    name,
    email,
    designation,
    companyName,
    createdBy: req.user._id,
  });
  res.status(200).json({
    status: 'success',
    message: 'Client Account created successfully',
  });
});

//Update client account
export const updateClient = catchAsync(async (req, res, next) => {
  const { id, email } = req.query;

  const client = Client.findOne({ _id: id, email: email });
  if (!client) return next(new AppError('Account not found!', 404));

  await Client.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

//Get all Client
export const getClient = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  let filters = {};

  if (id) filters._id = id;

  const clients = await Client.find(filters).lean.sort({ updatedAt: -1 });

  res.status(200).json({
    status: 'success',
    data: clients,
  });
});

//Delete client Account
export const deleteClient = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const client = await Client.findById(id);

  if (!client) return next(new AppError('Account not found', 404));

  const isDeleted = await Client.findByIdAndRemove(id);
  if (!isDeleted) return next(new AppError('Internal Server error', 404));

  res.status(200).json({ status: 'success', message: 'Client deleted successfully' });
});
