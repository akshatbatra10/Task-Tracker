import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createTask,
  deleteTask,
  getTasks,
  Task,
  updateTask,
} from "../services/taskService";
import axios from "axios";

const ProjectTasks = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending"
  );
  const [creating, setCreating] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState<string | undefined>(
    ""
  );
  const [editStatus, setEditStatus] = useState<
    "pending" | "in-progress" | "completed"
  >("pending");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) return;

      try {
        const data = await getTasks(projectId);
        setTasks(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error?.response?.data?.message);
        } else {
          setError("Failed to fetch tasks");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectId || !title.trim()) return;

    setCreating(true);
    setError(null);

    try {
      const newTask = await createTask(projectId, {
        title: title.trim(),
        description: description.trim(),
        status,
      });

      setTasks((prev) => [newTask, ...prev]);
      setTitle("");
      setDescription("");
      setStatus("pending");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
      } else {
        setError("Failed to create task");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !editingTaskId) return;

    try {
      const updatedTask = await updateTask(projectId, editingTaskId, {
        title: editTitle.trim(),
        description: editDescription?.trim(),
        status: editStatus,
      });

      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      setEditingTaskId(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
      } else {
        setError("Failed to update task");
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!projectId) return;
    try {
      await deleteTask(projectId, taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Project Tasks</h1>
          <Link to="/" className="text-blue-600 text-sm hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleCreateTask} className="space-y-3 mb-6">
          <h2 className="text-md font-semibold">Create New Task</h2>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={2}
          />
          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "pending" | "in-progress" | "completed"
              )
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Add Task"}
          </button>
        </form>

        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && tasks.length === 0 && (
          <p className="text-gray-500">No tasks in this project yet.</p>
        )}

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 border rounded-md">
              {editingTaskId === task._id ? (
                // ✅ Edit form
                <form onSubmit={handleUpdateTask} className="space-y-2">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                    placeholder="Description (optional)"
                  />
                  <select
                    value={editStatus}
                    onChange={(e) =>
                      setEditStatus(
                        e.target.value as
                          | "pending"
                          | "in-progress"
                          | "completed"
                      )
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-300 px-3 py-1 rounded-md"
                      onClick={() => setEditingTaskId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // ✅ Read-only task view
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-gray-700 mb-1">
                        {task.description}
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      Status: {task.status} • Created:{" "}
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectTasks;
