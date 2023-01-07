import mongoose, { model, Schema } from 'mongoose';

const LeaveSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    approvedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      required: [true, 'Leave Type is required'],
    },

    from: {
      type: String,
      required: [true, 'From Date is required'],
    },

    to: {
      type: String,
      required: [true, 'To Date is required'],
    },

    reason: {
      type: String,
      required: [true, 'Reason is required'],
    },

    status: {
      type: String,
      default: 'Pending',
      required: [true, 'Leave Status is required'],
    },
  },
  { timestamps: true }
);

//LeaveSchema.index({ username: "text" });

export const Leave = model('Leave', LeaveSchema);
