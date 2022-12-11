import { model, Schema } from 'mongoose';

const TotalLeave = new Schema(
  {
    totalLeaves: {
      type: String,
      default: 24,
      required: [true, 'From Date is required'],
    },
    leaveType: [],

  },
  { timestamps: true }
);

export const TotalLeaves = model('TotalLeaves', TotalLeave);
