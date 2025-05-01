import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const createProject = async (userId, data) => {
  const count = await Project.countDocuments({ user: userId });

  if (count >= 4) {
    throw new Error("Project limit reached. A user can have upto 4 projects.");
  }

  const project = await Project.create({
    ...data,
    user: userId,
  });

  return project;
};

export const getProjects = async (userId) => {
  const projects = await Project.find({
    user: userId,
  }).sort("-createdAt");

  return projects;
};

export const getProjectById = async (userId, projectId) => {
  const project = await Project.findOne({ _id: projectId, user: userId });

  if (!project) throw new Error("Project not found");

  return project;
};

export const updateProject = async (userId, projectId, data) => {
  const project = await getProjectById(userId, projectId);

  project.name = data.name ?? project.name;

  const savedProject = await project.save();

  return savedProject;
};

export const deleteProject = async (userId, projectId) => {
  const project = await getProjectById(userId, projectId);
  await Task.deleteMany({ project: projectId });
  return Project.deleteOne({ _id: projectId });
};
