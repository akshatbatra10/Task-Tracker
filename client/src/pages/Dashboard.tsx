import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import {
  createProject,
  getProjects,
  Project,
} from "../services/projectService";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error?.response?.data?.message);
        } else {
          setError("Failed to fetch projects");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setCreating(true);
    setError(null);

    try {
      const newProject = await createProject(projectName.trim());
      setProjects((prev) => [newProject, ...prev]);
      setProjectName("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
      } else {
        setError("Failed to create a new project");
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Welcome, {user?.name} 👋</h1>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleCreateProject} className="mb-4 flex gap-2">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
            className="flex-1 p-2 border rounded-md"
            disabled={creating}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={creating}
          >
            {creating ? "Creating..." : "Add"}
          </button>
        </form>

        <h2 className="text-lg font-semibold mb-2">Your Projects</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && projects.length === 0 && (
          <p className="text-gray-500">You don’t have any projects yet.</p>
        )}

        <ul className="space-y-2">
          {projects.map((project) => (
            <Link
              to={`/projects/${project._id}`}
              key={project._id}
              className="block p-4 border rounded-md hover:bg-gray-50"
            >
              <div className="font-medium">{project.name}</div>
              <div className="text-sm text-gray-500">
                Created on {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
