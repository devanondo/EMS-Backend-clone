import { model, Schema } from 'mongoose';

const HolidaySchema = new Schema(
    {
      holidayName: {
        type: String,
        default: '',
        required: [true, 'Holiday Name Type is required'],
      },
  
      holidayStart: {
          type: String,
          default: '',
          required: [true, 'Holiday Start Date is required'],
        },
  
        holidayEnd: {
          type: String,
          default: '',
          required: [true, 'Holiday End Date is required'],
        },

        totalHoliday:{
          type: Number,
          default: 0,
          required: [true, 'Holiday End Date is required'],
        }

    },
    { timestamps: true }
  );
  
  export const Holiday = model('Holiday', HolidaySchema);
  