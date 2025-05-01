import * as projectService from "../services/ProjectService.js";

export const createProjectController = async (req, res) => {
  try {
    const project = await projectService.createProject(req.user.id, req.body);
    return res.status(201).json(project);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProjectsController = async (req, res) => {
  const projects = await projectService.getProjects(req.user.id);
  return res.status(200).json(projects);
};

export const getProjectController = async (req, res) => {
  try {
    const project = await projectService.getProjectById(
      req.user.id,
      req.params.id
    );
    return res.status(200).json(project);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateProjectController = async (req, res) => {
  try {
    const project = await projectService.updateProject(
      req.user.id,
      req.params.id,
      req.body
    );
    return res.status(200).json(project);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    await projectService.deleteProject(req.user.id, req.params.id);

    return res.status(204).end();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
