import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createTask, getTasks, Task } from "../services/taskService";
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
              <div className="font-medium">{task.title}</div>
              <div className="text-sm text-gray-500">
                Status: {task.status} • Created:{" "}
                {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectTasks;
