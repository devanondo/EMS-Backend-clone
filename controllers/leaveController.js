import moment from 'moment';
import { Leave } from '../models/leaveModel.js';
import { TotalLeaves } from '../models/totalLeaveModel.js';
import { User } from '../models/userModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// Create a Leave
// export const createLeave = catchAsync(async (req, res) => {
//   const { leaveType, from, to, leaveReason } = req.body;

//   const diffInMs = new Date(to) - new Date(from);
//   const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

//   if (diffInDays > 0) {
//     const TotalLeave = await TotalLeaves.find().lean();
//     const { _id } = TotalLeave[0];
//     const leave = await Leave.create({
//       username: req.user.username,
//       leaveType,
//       from,
//       to,
//       leaveReason,
//       appliedForLeaves: diffInDays,
//       totalLeaves: _id,
//       user: req.user._id,
//     });
//     await User.updateOne(
//       { _id: req.user._id },
//       {
//         $push: {
//           leave: leave._id,
//         },
//       }
//     );
//     res.status(201).json({
//       status: 'success',
//       message: 'Leave Created Successfully',
//     });
//   } else {
//     res.status(404).json({
//       status: 'failed',
//       message: 'Please change your date',
//     });
//   }
// });

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

  // let months = toDate.diff(fromDate, 'months');
  // fromDate.add(months, 'months');
  // let days12 = toDate.diff(fromDate, 'days');
  //months + ' ' + 'Month(s)'+ ' ' + days + " Day(s)"

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('User not found!', 404));
  }
  let isCreate = false;
  const totalLeave = await TotalLeaves.find();
  user.leave.map((emLeave) => {
    totalLeave[0].leaveType.map((item) => {
      if (item.title === type) {
        let alreadyTakenLeave = emLeave.leaves[`${type}`];

        if (alreadyTakenLeave + diff <= item.days) {
          isCreate = true;
          console.log(alreadyTakenLeave + diff);
        } else {
          return next(new AppError('Please select valid date', 404));
        }
      }
    });
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
    return next(new AppError('Already in this status!', 404));
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

  // console.log(moment(from, 'DD-MM-YYYY').format('MM-DD-YYYY'));
  const dataLength = new ApiFeatures(
    Leave.find(filters).lean().sort({ updatedAt: -1 }).populate('user', ['username']),
    req.query
  ).searchByDate();

  const apiFeatures = new ApiFeatures(
    Leave.find(filters).lean().sort({ updatedAt: -1 }).populate('user', ['username']),
    req.query
  )
    .searchByDate()
    .pagination();

  const leaves = await apiFeatures.query;

  res.status(200).json({
    status: 'success',
    count: dataLength.length,
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
      .populate('user', ['username', 'leave']),
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

// export const createNewLeave = catchAsync(async (req, res) => {

// })

// Get single/all Leave
export const getLeaves = catchAsync(async (req, res) => {
  const leaves = await Leave.find().sort({ updatedAt: -1 });
  res.status(200).json({
    status: 'success',
    data: leaves,
  });
});

// Get search Leave
export const searchLeaves = catchAsync(async (req, res) => {
  const { search } = req.body;
  try {
    const leaves = await Leave.find({ $text: { $search: search } });
    res.status(200).json({
      status: 'success',
      data: leaves,
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a Leave
export const updateLeave = catchAsync(async (req, res) => {
  const leaves = await Leave.find().sort({ updatedAt: -1 });
  const { leaveType, from, to, leaveReason, leaveStatus } = req.body;
  const diffInMs = new Date(to) - new Date(from);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
  const TotalLeave = await TotalLeaves.find().lean();

  if (diffInDays > 0) {
    const totalLeave = TotalLeave[0].totalLeaves;
    let countLeave;

    if (leaveStatus === 'Approved') {
      countLeave = diffInDays;
    }

    const UpdateLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          leaveType,
          from,
          to,
          leaveReason,
          numberOfDays: countLeave,
          leaveStatus,
        },
      },
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
