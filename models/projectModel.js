import { model, Schema } from 'mongoose';

const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      default: '',
      required: [true, 'Project Name is required'],
    },

    client: {
      type: String,
      default: '',
      required: [true, 'Client is required'],
    },

    startDate: {
      type: String,
      default: '',
      required: [true, 'Start Date is required'],
    },

    endDate: {
      type: String,
      default: '',
      required: [true, 'End Date is required'],
    },

    rate: {
      type: String,
      default: '',
      required: [true, 'Rate is required'],
    },

    priority: {
      type: String,
      default: '',
      required: [true, 'Priority is required'],
    },

    completed: {
      type: Number,
      default: 0,
      required: [true, 'Completed is required'],
    },

    projectLeader: {
      type: String,
      default: '',
      required: [true, 'Project Leader is required'],
    },

    teamMember: {
      type: Array,
      default: '',
      required: [true, 'Team Member is required'],
    },

    address: {
      type: String,
      default: '',
      required: [true, 'Address is required'],
    },

    description: {
      type: String,
      default: '',
      required: [true, 'description is required'],
    },

    file: {
      type: String,
      default: '',
      required: [false, 'file is required'],
    },
  },
  { timestamps: true }
);

export const Project = model('Project', ProjectSchema);
