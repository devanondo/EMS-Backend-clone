import catchAsync from '../utils/catchAsync.js';
import { Leave } from '../models/leaveModel.js';
import { TotalLeaves } from '../models/totalLeaveModel.js';
import { User } from '../models/userModel.js';

// Create a Leave
export const createLeave = catchAsync(async (req, res) => {
  const { leaveType, from, to, leaveReason } = req.body;
 
  const diffInMs = new Date(to) - new Date(from);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays > 0) {
    const TotalLeave = await TotalLeaves.find().lean();
    const {_id}= TotalLeave[0]
   const leave = await Leave.create({
      username:req.user.username,
      leaveType,
      from,
      to,
      leaveReason,
      appliedForLeaves: diffInDays,
      totalLeaves: _id,
      user: req.user._id,
    });
    await User.updateOne({_id:req.user._id },{
      $push: {
        leave: leave._id
      }
    })
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


// Get User leave form User Model 
export const getUserLeave = catchAsync(async (req, res) => {
  const leaves = await User.find({_id: req.user._id}).populate("leave");
  res.status(200).json({
    status: 'success',
    data: leaves[0].leave,
  });
});


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
  const {search} = req.body
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
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  const TotalLeave = await TotalLeaves.find().lean();
 

  if (diffInDays > 0) {
    const totalLeave = TotalLeave[0].totalLeaves
    console.log(totalLeave);
    let countLeave;

    if (leaveStatus === "Approved") {
      countLeave = diffInDays
 
    }

    const UpdateLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { $set: {
        leaveType,
        from,
        to,
        leaveReason,
        numberOfDays: countLeave,
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
