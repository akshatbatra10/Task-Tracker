import api from "./api";

export interface Project {
  _id: string;
  name: string;
  createdAt: Date;
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>("/projects");
  return response.data;
};

export const createProject = async (name: string): Promise<Project> => {
  const response = await api.post<Project>("/projects", { name });

  return response.data;
};

export const updateProject = async (
  projectId: string,
  name: string
): Promise<Project> => {
  const response = await api.put<Project>(`/projects/${projectId}`, { name });

  return response.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await api.delete(`/projects/${projectId}`);
};
