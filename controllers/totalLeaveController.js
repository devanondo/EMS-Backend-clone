import { TotalLeaves } from '../models/totalLeaveModel.js';
import catchAsync from '../utils/catchAsync.js';

// Create total leave
export const createTotalLeave = catchAsync(async (req, res) => {
  await TotalLeaves.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Leave Created Successfully',
  });
});

// Get total leave
export const getTotalLeave = catchAsync(async (req, res) => {
  const TotalLeave = await TotalLeaves.find().lean();
  if (TotalLeave.length) {
    res.status(200).json(TotalLeave[0]);
  } else {
    await TotalLeaves.create(req.body);
    const TotalLeave = await TotalLeaves.find().lean();
    res.status(200).json(TotalLeave[0]);
  }
});

// Update total leave
export const updateTotalLeave = catchAsync(async (req, res) => {
  console.log(req.body);
  const { new3, yearlyLeave, TotalLeave } = req.body;
  if (yearlyLeave) {
    const UpdateLeave = await TotalLeaves.findByIdAndUpdate(
      req.params.id,
      { $set: { totalLeaves: yearlyLeave, leaveType: new3 } },
      { new: true }
    );
    res.status(201).json({
      status: 'success',
      message: 'Leave Update Successfully',
      data: UpdateLeave,
    });
  } else {
    const UpdateLeave = await TotalLeaves.findByIdAndUpdate(
      req.params.id,
      { $set: { totalLeaves: TotalLeave, leaveType: new3 } },
      { new: true }
    );
    res.status(201).json({
      status: 'success',
      message: 'Leave Update Successfully',
      data: UpdateLeave,
    });
  }
});

// Clear total leave

export const clearTotalLeave = catchAsync(async (req, res) => {
  console.log(req.params.id);
  console.log('clearTotalLeave');
  const UpdateLeave = await TotalLeaves.findByIdAndUpdate(
    req.params.id,
    { $set: { leaveType: [] } },
    { new: true }
  );
  res.status(201).json({
    status: 'success',
    message: 'Leave Update Successfully',
    data: UpdateLeave,
  });
});
