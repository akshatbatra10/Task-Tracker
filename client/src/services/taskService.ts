import api from "./api";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  completedAt?: Date;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status?: "pending" | "in-progress" | "completed";
}

export const getTasks = async (projectId: string): Promise<Task[]> => {
  const response = await api.get(`/projects/${projectId}/tasks`);

  return response.data;
};

export const createTask = async (
  projectId: string,
  payload: CreateTaskPayload
): Promise<Task> => {
  const response = await api.post<Task>(
    `/projects/${projectId}/tasks`,
    payload
  );
  return response.data;
};

export const updateTask = async (
  projectId: string,
  taskId: string,
  payload: Partial<CreateTaskPayload>
): Promise<Task> => {
  const response = await api.put<Task>(
    `/projects/${projectId}/tasks/${taskId}`,
    payload
  );
  return response.data;
};

export const deleteTask = async (
  projectId: string,
  taskId: string
): Promise<void> => {
  await api.delete(`/projects/${projectId}/tasks/${taskId}`);
};
