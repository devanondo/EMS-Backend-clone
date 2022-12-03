import catchAsync from '../utils/catchAsync.js';
import { Holiday } from '../models/HolidayModel.js';
import AppError from '../utils/appError.js';


// Create a Holiday
export const createHoliday = catchAsync(async (req, res) => {
    await Holiday.create(req.body);
  
    res.status(201).json({
      status: 'success',
      message: 'Holiday Created Successfully',
    });
  });
  
  
  // Get single/all Holiday
  export const getHolidays = catchAsync(async (req, res, next) => {
    const { did } = req.query;
    const filters = {};

    if (did) {
      filters._id = did;
      const Projects = await Holiday.find(filters).lean().sort({ updatedAt: -1 });
      if (!Projects) return next(new AppError('Holidays not found..!', 404));

      res.status(200).json({
        status: 'success',
        data: Projects,
      });
    } else{
      const Projects = await Holiday.find().lean().sort({ updatedAt: -1 });
      res.status(200).json({
        status: 'success',
        data: Projects,
      });
    }

  });
  
  // Update a Holiday
  export const updateHoliday = catchAsync(async (req, res) => {
  
    const UpdateHoliday = await Holiday.findByIdAndUpdate(
      req.params.id,
      {$set: req.body},
      {new: true}
    );

    res.status(201).json({
      status: 'success',
      message: 'Holiday Update Successfully',
      data: UpdateHoliday,
    });
  });
  
  // Delete all Holiday
  export const deleteHoliday = catchAsync(async (req, res) => {
    await Holiday.findByIdAndDelete(req.params.id);
  
    res.status(201).json({
      status: 'success',
      message: 'Holiday Delete Successfully',
    });
  });
  