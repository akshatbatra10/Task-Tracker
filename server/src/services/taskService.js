import mongoose from "mongoose";
import Task from "../models/Task.js";
import { getProjectById } from "./ProjectService.js";

export const createTask = async (userId, projectId, data) => {
  await getProjectById(userId, projectId);

  const newTask = await Task.create({ ...data, project: projectId });

  return newTask;
};

export const getTasks = async (userId, projectId) => {
  await getProjectById(userId, projectId);

  const tasks = await Task.find({ project: projectId }).sort("-createdAt");

  return tasks;
};

export const getTaskById = async (userId, taskId) => {
  const task = await Task.findById(taskId).populate("project");

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.project.user.toString() !== userId) {
    throw new Error("Unauthorized access");
  }

  return task;
};

export const updateTask = async (userId, taskId, data) => {
  const task = await getTaskById(userId, taskId);
  Object.assign(task, data);
  if (task.status == "completed") task.completedAt = new Date();

  return task.save();
};

export const deleteTask = async (userId, taskId) => {
  const task = await getTaskById(userId, taskId);

  return Task.deleteOne({ _id: taskId });
};
