import catchAsync from '../utils/catchAsync.js';
import { Leave } from '../models/leaveModel.js';
import { TotalLeaves } from '../models/totalLeaveModel.js';

// Create a Leave
export const createLeave = catchAsync(async (req, res) => {
  const { leaveType, from, to, leaveReason } = req.body;

  const diffInMs = new Date(to) - new Date(from);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays > 0) {
    const totalLeave = 20;
    const remainingLeaves = totalLeave - diffInDays;
    const TotalLeave = await TotalLeaves.find().lean();
    const {_id}= TotalLeave[0]
    await Leave.create({
      leaveType,
      from,
      to,
      leaveReason,
      numberOfDays: diffInDays,
      // remainingLeaves,
      totalLeaves: _id
    });
    res.status(201).json({
      status: 'success',
      message: 'Leave Created Successfully',
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'Please change your date',
    });
  }
});

// Get single/all Leave
export const getLeaves = catchAsync(async (req, res) => {
  const { did } = req.query;
  const filters = {};

  if (did) {
    filters._id = did;
  }
  const Projects = await Leave.find(filters).populate("leaveType", "-_id").sort({ updatedAt: -1 });
  res.status(200).json({
    status: 'success',
    data: Projects,
  });
});

// Update a Leave
export const updateLeave = catchAsync(async (req, res) => {
 
  const { leaveType, from, to, leaveReason, leaveStatus } = req.body;
  const diffInMs = new Date(to) - new Date(from);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  const TotalLeave = await TotalLeaves.find().lean();

  if (diffInDays > 0) {

    const remainingLeaves = TotalLeave[0].totalLeaves - diffInDays;
    
    const UpdateLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { $set: {
        leaveType,
        from,
        to,
        leaveReason,
        numberOfDays: diffInDays,
        remainingLeaves,
        leaveStatus
      } },
      { new: true }
    );
    res.status(201).json({
      status: 'success',
      message: 'Leave Update Successfully',
      data: UpdateLeave,
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'Please change your date',
    });
  }
});

// Delete all Leave
export const deleteLeave = catchAsync(async (req, res) => {
  await Leave.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Leave Delete Successfully',
  });
});
