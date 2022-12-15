import mongoose, { model, Schema } from 'mongoose';

const AttendanceSchema = new Schema(
  {
    year: String,
    value: [
      {
        month: String,
        value: [
          {
            day: String,
            punchIn: [
              {
                time: String,
                employeeId: mongoose.Schema.ObjectId,
              },
            ],
            punchOut: [
              {
                time: String,
                employeeId: mongoose.Schema.ObjectId,
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Attendance = model('Attendance', AttendanceSchema);
