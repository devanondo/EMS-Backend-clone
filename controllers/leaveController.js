import catchAsync from '../utils/catchAsync.js';
import { Leave } from '../models/leaveModel.js';


// Create a Leave
export const createLeave = catchAsync(async (req, res) => {
    await Leave.create(req.body);
  
    res.status(201).json({
      status: 'success',
      message: 'Leave Created Successfully',
    });
  });
  
  // Get single/all Leave
  export const getLeaves = catchAsync(async (req, res) => {
    const { did } = req.query;
    const filters = {};
  
    if (did) {
      filters._id = did;
    }
    const Projects = await Leave.find(filters).lean().sort({ updatedAt: -1 });
    res.status(200).json({
      status: 'success',
      data: Projects,
    });
  });
  
  // Update a Leave
  export const updateLeave = catchAsync(async (req, res) => {
  
    const UpdateLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      {$set: req.body},
      {new: true}
    );
  
  
    res.status(201).json({
      status: 'success',
      message: 'Leave Update Successfully',
      data: UpdateLeave,
    });
  });
  
  // Delete all Leave
  export const deleteLeave = catchAsync(async (req, res) => {
    await Leave.findByIdAndDelete(req.params.id);
  
    res.status(201).json({
      status: 'success',
      message: 'Leave Delete Successfully',
    });
  });
  