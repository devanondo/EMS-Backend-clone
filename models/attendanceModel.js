import { model, Schema } from 'mongoose';

const AttendanceSchema = new Schema(
  {
    punchIn: {
      type: String,
      default: '',
      required: [false, 'Punch In Time is required'],
    },

    punchOut: {
      type: String,
      default: '',
      required: [false, 'Punch Out Time is required'],
    },

    production: {
      type: Number,
      default: 8,
      required: [true, 'Production time is required'],
    },

    break: {
      type: String,
      default: '30 Min',
      required: [true, 'Break time is required'],
    },

    overtime: {
      type: Number,
      default: 0,
      required: [true, 'Overtime is required'],
    },
  },
  { timestamps: true }
);

export const Attendance = model('Attendance', AttendanceSchema);
