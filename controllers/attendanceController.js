import catchAsync from '../utils/catchAsync.js';
import { Attendance } from '../models/attendanceModel.js';

// Create a attendance
export const createAttendance = catchAsync(async (req, res) => {
  await Attendance.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Attendance Successful',
  });
});

// Get single/all attendance
export const getAttendances = catchAsync(async (req, res) => {
  const { did } = req.query;
  const filters = {};

  if (did) {
    filters._id = did;
  }
  const Attendances = await Attendance.find(filters).lean().sort({ updatedAt: -1 });
  res.status(200).json({
    status: 'success',
    data: Attendances,
  });
});

// Update a attendance
export const updateAttendance = catchAsync(async (req, res) => {

  const UpdateAttendance = await Attendance.findByIdAndUpdate(
    req.params.id,
    {$set: req.body},
    {new: true}
  );


  res.status(201).json({
    status: 'success',
    message: 'Attendance Update Successfully',
    data: UpdateAttendance,
  });
});

// Delete all attendance
export const deleteAttendance = catchAsync(async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Attendance Delete Successfully',
  });
});
