import { model, Schema } from 'mongoose';

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
          default: '',
          required: [false, 'Number Of Days Date is required'],
        },
  
        remainingLeaves: {
          type: Number,
          default: '',
          required: [false, 'Remaining Leaves is required'],
        },
  
        totalLeaves: {
          type: Number,
          default: 20,
          required: [true, 'Priority is required'],
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
  