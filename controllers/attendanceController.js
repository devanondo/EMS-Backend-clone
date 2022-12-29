import moment from 'moment';
import { Attendance } from '../models/attendanceModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import catchAsync from '../utils/catchAsync.js';

export const createAttendance = catchAsync(async (req, res, next) => {
  const today = moment().startOf('day');

  const attendance = await Attendance.findOne({
    user: req.body.user,
    createdAt: {
      $gte: today.toDate(),
      $lte: moment(today).endOf('day').toDate(),
    },
  });

  if (!attendance) {
    const data = {
      user: req.body.user,
      attendance: [
        {
          status: req.body.status,
          time: new Date(),
        },
      ],
    };

    await Attendance.create(data);

    res.status(200).json({
      status: 'success',
      message: `${req.body.status} Successfully!`,
    });
  }

  attendance.attendance.push({
    status: req.body.status,
    time: new Date(),
  });

  await attendance.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    message: `${req.body.status} Successfully!`,
  });
});

//Get all Attendance
export const getAllAttendance = catchAsync(async (req, res, next) => {
  const filters = {};

  if (req.params.id) {
    filters.id = req.params.id;
  }

  const count = await Attendance.countDocuments();

  const apiFeatures = new ApiFeatures(
    Attendance.find(filters).lean().sort({ updatedAt: -1 }).populate('user', ['username']),
    req.query
  )
    .searchByDate()
    .pagination();

  const attendance = await apiFeatures.query;

  res.status(200).json({
    status: 'success',
    data: attendance,
    count,
  });
});

//Get user Attendance
export const getUserAttendance = catchAsync(async (req, res, next) => {
  const count = await Attendance.countDocuments();

  const apiFeatures = new ApiFeatures(
    Attendance.find({ user: req.query.id })
      .lean()
      .sort({ updatedAt: -1 })
      .populate('user', ['username']),
    req.query
  )
    .searchByDate()
    .pagination();

  const attendance = await apiFeatures.query;

  res.status(200).json({
    status: 'success',
    data: attendance,
    count,
  });
});
