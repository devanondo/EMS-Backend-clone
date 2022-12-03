import mongoose, { model, Schema } from 'mongoose';

const ClientSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Client name is required!'],
  },
  designation: {
    type: String,
    required: [true, 'Client designation is required!'],
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required!'],
  },

  phone: {
    type: String,
    required: [true, 'Client phone is required!'],
  },
  email: {
    type: String,
    required: [true, 'Client email is required!'],
  },
  address: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  projects: [
    {
      projectId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Projects',
      },
    },
  ],
});

export const Client = model('Client', ClientSchema);
