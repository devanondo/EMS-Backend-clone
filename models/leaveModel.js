import mongoose, { model, Schema } from 'mongoose';

const LeaveSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },

    username: {
      type: String,
    },

    leaveType: {
      type: String,
      default: '',
      required: [true, 'Leave Type is required'],
    },

    from: {
      type: String,
      default: '',
      required: [true, 'From Date is required'],
    },

    to: {
      type: String,
      default: '',
      required: [true, 'To Date is required'],
    },

    numberOfDays: {
      type: Number,
      default: 0,
      required: [true, 'Number Of Days Date is required'],
    },

    appliedForLeaves: {
      type: Number,
      required: [false, 'Remaining Leaves is required'],
    },

    totalLeaves: {
      type: mongoose.Types.ObjectId,
      ref: 'TotalLeaves',
    },

    leaveReason: {
      type: String,
      default: '',
      required: [true, 'Leave Reason is required'],
    },

    leaveStatus: {
      type: String,
      default: 'Pending',
      required: [true, 'Leave Status is required'],
    },
  },
  { timestamps: true }
);

LeaveSchema.index({ username: "text" });

export const Leave = model('Leave', LeaveSchema);
