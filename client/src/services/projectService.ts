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
