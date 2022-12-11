import mongoose, { model, Schema } from 'mongoose';

const LeaveSchema = new Schema(
    {
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
  
        remainingLeaves: {
          type: Number,
          default: 24,
          required: [true, 'Remaining Leaves is required'],
        },
  
        totalLeaves: {
          type: mongoose.Types.ObjectId,
          ref: "TotalLeaves"
         
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
  
  export const Leave = model('Leave', LeaveSchema);
  