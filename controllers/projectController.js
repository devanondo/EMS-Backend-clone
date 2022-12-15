import { Project } from '../models/projectModel.js';
import { User } from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

// Create a project
export const createProject = catchAsync(async (req, res) => {
  const project = await Project.create(req.body);

  project.teamMember.reduce(async (acc, curr) => {
    const users = await User.findById(curr._id);

    users.project.push(project._id);
    await users.save({ validateBeforeSave: false });
    return acc;
  }, []);

  res.status(201).json({
    status: 'success',
    message: 'Project Created Successfully',
  });
});

// Get single/all project
export const getProjects = catchAsync(async (req, res) => {
  const { did } = req.query;
  const filters = {};

  if (did) {
    filters._id = did;
  }
  const Projects = await Project.find(filters).lean().sort({ updatedAt: -1 });
  res.status(200).json({
    status: 'success',
    data: Projects,
  });
});

// Update a project
export const updateProject = catchAsync(async (req, res) => {
  const UpdateProject = await Project.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    message: 'Project Update Successfully',
  });
});

// Update a project
export const progressUpdate = catchAsync(async (req, res) => {
  console.log(req.params.id);
  await Project.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(201).json({
    status: 'success',
    message: 'Project Update Successfully',
  });
});

// Delete all project
export const deleteProject = catchAsync(async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: 'Project Delete Successfully',
  });
});
