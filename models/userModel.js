import jwt from 'jsonwebtoken';
import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      default: 'user',
    },
    username: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    secondaryPhone: {
      type: String,
      unique: true,
    },
    designation: {
      type: String,
      default: 'staff',
    },
    department: {
      type: String,
    },
    idno: {
      type: String,
      unique: true,
    },
    
    address: [
      {
        address1: {
          type: String,
        },
      },
    ],
    education: [
      {
        type: {
          type: String,
        },
        name: {
          type: String,
        },
        department: {
          type: String,
        },
        result: {
          type: String,
        },
        from: {
          type: String,
        },
        to: {
          type: String,
        },

        outof: {
          type: String,
          default: '5',
        },
      },
    ],
    avatar: {
      type: String,
      default: 'preview.png',
    },

    // Leave
    leave: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Leave',
      },
    ],

    project: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          ref: 'Leave',
        },
      },
    ],

    //Attendance
    attendance: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          ref: 'Attendance',
        },
      },
    ],

    // Personal Info
    birth: {
      type: String,
    },
    gender: {
      type: String,
    },
    nid: {
      type: String,
      unique: true,
    },
    religion: {
      type: String,
    },
    materialstatus: {
      type: String,
    },

    // Emergency Contact
    emergency: {
      ename: {
        type: String,
      },
      enid: {
        type: String,
      },
      erelationships: {
        type: String,
      },
      ephone: {
        type: String,
      },
      ematerialstatus: {
        type: String,
      },
    },

    salary: {
      type: String,
    },
    joindate: {
      type: String,
    },
  },
  { timestamps: true }
);
UserSchema.index({ username: 'text' });
// JWT TOKEN
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const User = model('User', UserSchema);
