import moment from 'moment';
import { Attendance } from '../models/attendanceModel.js';
import catchAsync from '../utils/catchAsync.js';
// Create a attendance
export const createAttendance = catchAsync(async (req, res) => {
  const { action } = req.query;
  const month = moment().format('MMMM');
  const today = moment().format('DD');
  const timeNow = moment().format('LTS');
  const year = moment().format('YYYY');

  const { _id } = req.user;

  const attendanceYear = await Attendance.findOne({ year: year });

  if (!attendanceYear) {
    const att = await Attendance.create({
      year: year,
      value: [
        {
          month: month,
          value: [
            {
              day: today,
              punchIn: [],
              punchOut: [],
            },
          ],
        },
      ],
    });

    att.value.reduce((acc, cur) => {
      if (cur.month === month) {
        cur.value.reduce((itms, current) => {
          if (current.day === today) {
            if (action === 'punchIn') {
              current.punchIn.push({ time: timeNow, employeeId: _id });
            } else if (action === 'punchOut') {
              current.punchOut.push({ time: timeNow, employeeId: _id });
            }
          }
        }, []);
      }
      return cur;
    }, []);

    att.save({ validateBeforeSave: false });

    res.status(201).json({
      att,
    });
  } else {
    attendanceYear.value.reduce((acc, cur) => {
      if (cur.month === month) {
        cur.value.reduce((itms, current) => {
          if (current.day === today) {
            if (action === 'punchIn') {
              current.punchIn.push({ time: timeNow, employeeId: _id });
            } else if (action === 'punchOut') {
              current.punchOut.push({ time: timeNow, employeeId: _id });
            }
          }
        }, []);
      }
      return cur;
    }, []);

    attendanceYear.save({ validateBeforeSave: false });

    res.status(201).json({
      attendanceYear,
    });
  }
});

// Get single/all attendance
export const getAttendances = catchAsync(async (req, res) => {
  const { did } = req.query;
  const filters = {};

  if (did) {
    filters._id = did;
  }
  const Attendances = await Attendance.find(filters).lean().sort({ updatedAt: -1 });
  res.status(200).json({
    status: 'success',
    data: Attendances,
  });
});

// Update a attendance
export const updateAttendance = catchAsync(async (req, res) => {
  const UpdateAttendance = await Attendance.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    message: 'Attendance Update Successfully',
    data: UpdateAttendance,
  });
});

// Delete all attendance
export const deleteAttendance = catchAsync(async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Attendance Delete Successfully',
  });
});
