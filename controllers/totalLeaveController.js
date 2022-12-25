import { TotalLeaves } from '../models/totalLeaveModel.js';
import catchAsync from '../utils/catchAsync.js';

//Create leave
export const createTotalLeave = catchAsync(async (req, res, next) => {
  req.body.days = parseInt(req.body.days);

  const leave = await TotalLeaves.find();
  if (leave.length <= 0) {
    const createLeave = { leaveType: [], total: 0 };
    await TotalLeaves.create({ createLeave });
  }

  const leaves = await TotalLeaves.find();

  leaves[0].leaveType.push(req.body);
  leaves[0].total += req.body.days;

  await leaves[0].save({ validateBeforeSave: false });

  // const users = await User.find();

  // users.reduce((acc, cur) => {
  //   // const user = await User.findById(cur._id);
  //   cur.leave.reduce((accur, curr) => {
  //     if (curr.year === moment().year()) {
  //       const keys = Object.keys(curr.leaves);
  //       if (!keys.includes(req.body.title)) {
  //         curr.leaves[`${req.body.title}`] = 0;
  //       }
  //     }
  //     return accur;
  //   }, []);

  //   return acc;
  // }, []);

  // users.map(async (user) => {
  //   await user.save({ validateBeforeSave: true });
  // });

  // for (let i; i < users.length; i++) {
  //   await users[i].save({ validateBeforeSave: true });
  // }

  res.status(200).json({
    status: 'success',
    message: 'Leave Added Successfully!',
  });
});

// Get total leave
export const getTotalLeave = catchAsync(async (req, res, next) => {
  const totalLeave = await TotalLeaves.find().lean();

  if (totalLeave.length <= 0) {
    return next(new AppError('Leave not found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: totalLeave[0],
  });
});

//Update total leave
export const updateTotalLeave = catchAsync(async (req, res, next) => {
  const leaves = await TotalLeaves.find();

  leaves[0].leaveType.reduce((acc, cur) => {
    if (cur._id.toString() == req.query.id.toString()) {
      leaves[0].total -= cur.days;
      cur.days = req.query.days;
      leaves[0].total += cur.days;
    }
    return acc;
  }, []);

  leaves[0].save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Leave Updated successfully',
  });
});

//Delete total leave -- will next version
export const deleteTotalLeave = catchAsync(async (req, res, next) => {
  const leaves = await TotalLeaves.find();

  leaves[0].leaveType.reduce((acc, cur) => {
    if (cur._id.toString() === req.query.id.toString()) {
      leaves[0].total -= cur.days;
    } else {
      acc.push(cur);
    }

    return acc;
  }, []);

  leaves[0].save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Leave deleted successfully',
  });
});

// Create total leave
// export const createTotalLeave = catchAsync(async (req, res) => {
//   await TotalLeaves.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     message: 'Leave Created Successfully',
//   });
// });

// Update total leave
// export const updateTotalLeave = catchAsync(async (req, res) => {
//   console.log(req.body);
//   const { new3, yearlyLeave, TotalLeave } = req.body;
//   if (yearlyLeave) {
//     const UpdateLeave = await TotalLeaves.findByIdAndUpdate(
//       req.params.id,
//       { $set: { totalLeaves: yearlyLeave, leaveType: new3 } },
//       { new: true }
//     );
//     res.status(201).json({
//       status: 'success',
//       message: 'Leave Update Successfully',
//       data: UpdateLeave,
//     });
//   } else {
//     const UpdateLeave = await TotalLeaves.findByIdAndUpdate(
//       req.params.id,
//       { $set: { totalLeaves: TotalLeave, leaveType: new3 } },
//       { new: true }
//     );
//     res.status(201).json({
//       status: 'success',
//       message: 'Leave Update Successfully',
//       data: UpdateLeave,
//     });
//   }
// });

// Clear total leave

// export const clearTotalLeave = catchAsync(async (req, res) => {
//   console.log(req.params.id);
//   console.log('clearTotalLeave');
//   const UpdateLeave = await TotalLeaves.findByIdAndUpdate(
//     req.params.id,
//     { $set: { leaveType: [] } },
//     { new: true }
//   );
//   res.status(201).json({
//     status: 'success',
//     message: 'Leave Update Successfully',
//     data: UpdateLeave,
//   });
// });
