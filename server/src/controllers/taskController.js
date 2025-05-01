import * as taskService from "../services/taskService.js";

export const createTaskController = async (req, res) => {
  try {
    const task = await taskService.createTask(
      req.user.id,
      req.params.projectId,
      req.body
    );

    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getTasksController = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user.id, req.params.projectId);

    return res.json(tasks);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getTaskController = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.user.id, req.params.taskId);

    return res.json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.user.id,
      req.params.taskId,
      req.body
    );

    return res.json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    await taskService.deleteTask(req.user.id, req.params.taskId);

    return res.status(204).end();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
