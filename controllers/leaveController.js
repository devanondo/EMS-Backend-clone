import moment from 'moment';
import { Leave } from '../models/leaveModel.js';
import { TotalLeaves } from '../models/totalLeaveModel.js';
import { User } from '../models/userModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { getDiffTowDates } from '../utils/date.js';

//Create leave edited
export const createLeave = catchAsync(async (req, res, next) => {
  req.body.id = req.user._id;
  const { type, id, from, to, reason } = req.body;

  const fromDate = moment(from, 'MM-DD-YYYY');
  const toDate = moment(to, 'MM-DD-YYYY');

  if (fromDate.year() !== toDate.year()) {
    return next(new AppError('Please select same year!'));
  }

  let diff = toDate.diff(fromDate, 'days') + 1;

  const getMonthFirstLastDay = () => {
    let currentDate = moment();
    let start = currentDate.clone().startOf('month').format('MM-DD-YYYY');
    let end = currentDate.clone().endOf('month').format('MM-DD-YYYY');

    return { start, end };
  };

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('User not found!', 404));
  }

  req.query.from = getMonthFirstLastDay().start;
  req.query.to = getMonthFirstLastDay().end;

  //Check the taken leave within running month
  const monthlyLeave = new ApiFeatures(
    Leave.findOne({ user: user._id }).lean().sort({ updatedAt: -1 }),
    req.query
  ).searchByDate();

  const existingLeave = await monthlyLeave.query;

  if (existingLeave.length > 0) {
    const totalDate = existingLeave.reduce((acc, cur) => {
      let days = getDiffTowDates(cur.from, cur.to);

      return acc + days;
    }, 0);

    if (totalDate >= 2) return next(new AppError('Please try next month'));
  }

  let isCreate = false;
  const totalLeave = await TotalLeaves.find();

  user.leave.map((emLeave) => {
    if (emLeave.year === moment().year()) {
      totalLeave[0].leaveType.map((item) => {
        if (item.title === type) {
          let alreadyTakenLeave = emLeave.leaves[`${type}`];

          if (alreadyTakenLeave + diff <= item.days) {
            isCreate = true;
          } else {
            return next(new AppError('Please select valid date', 404));
          }
        }
      });
    }
  });

  if (isCreate) {
    const newLeave = await Leave.create({ user: id, type, from, to, reason });

    res.status(200).json({
      status: 'success',
      message: 'Request successful',
    });
  } else {
    next(new AppError('Please select the valid date!'));
  }
});

//Approved by admin
export const updateStatus = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const leave = await Leave.findById(id);
  if (!leave) return next(new AppError('Leave not found!', 404));

  if (leave.status === req.query.status) {
    return next(new AppError(`Already ${req.query.status}`, 404));
  }

  if (req.query.status === 'approved') {
    const user = await User.findById(leave.user);
    if (!user) return next(new AppError('User not found!', 404));

    //If approved from admin
    //Get date count
    const fromDate = moment(leave.from, 'MM-DD-YYYY');
    const toDate = moment(leave.to, 'MM-DD-YYYY');
    let days = toDate.diff(fromDate, 'days') + 1;

    const isValidLeaveDate = user.leave.reduce((acc, cur) => {
      if (cur.year === moment().year()) {
        cur.leaves[`${leave.type}`] += days;
      }
      acc.push(cur);
      return acc;
    }, []);
    await User.findByIdAndUpdate({ _id: user._id }, { leave: isValidLeaveDate }, { new: true });
    leave.status = req.query.status;
    leave.approvedBy = req.user._id;
  } else {
    leave.status = req.query.status;
  }

  await leave.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: `Leave ${req.query.status} successfully!`,
  });
});

//Get All Leaves
export const getAllLeaves = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const filters = {};

  if (id) {
    filters._id = id;
  }

  const document = await Leave.countDocuments();

  const apiFeatures = new ApiFeatures(
    Leave.find(filters)
      .lean()
      .sort({ updatedAt: -1 })
      .populate('user', ['username', 'leave', 'avatar', 'designation'])
      .populate('approvedBy', ['username', 'avatar', 'designation']),
    req.query
  )
    .searchByDate()
    .pagination();

  const leaves = await apiFeatures.query;

  res.status(200).json({
    status: 'success',
    count: document,
    data: leaves,
  });
});

// Get User leave form User Model
export const getUserLeave = catchAsync(async (req, res) => {
  const count = await Leave.countDocuments();
  const apiFeatures = new ApiFeatures(
    Leave.find({ user: req.user._id })
      .lean()
      .sort({ updatedAt: -1 })
      .populate('user', ['username', 'leave', 'avatar', 'designation'])
      .populate('approvedBy', ['username', 'avatar', 'designation']),
    req.query
  )
    .searchByDate()
    .pagination();

  const leaves = await apiFeatures.query;

  res.status(200).json({
    status: 'success',
    data: leaves,
    count,
  });
});
