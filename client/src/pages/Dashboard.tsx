import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import {
  createProject,
  deleteProject,
  getProjects,
  Project,
  updateProject,
} from "../services/projectService";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const maxProjects = 4;
  const hasReachedProjectLimit = projects.length >= maxProjects;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length === maxProjects) {
      toast("You’ve reached the limit of 4 projects", { icon: "⚠️" });
    }
  }, [projects.length]);

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setCreating(true);

    try {
      const newProject = await createProject(projectName.trim());
      setProjects((prev) => [newProject, ...prev]);
      setProjectName("");
      toast.success("Project created successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to create new project");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleStartEdit = (project: Project) => {
    setEditingProjectId(project._id);
    setEditProjectName(project.name);
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProjectId || !editProjectName.trim()) return;

    try {
      const updated = await updateProject(
        editingProjectId,
        editProjectName.trim()
      );
      setProjects((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setEditingProjectId(null);
      toast.success("Project updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to update project");
      }
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      toast.success("Project deleted successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to delete project");
      }
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Welcome, {user?.name} 👋</h1>
          <button
            onClick={handleLogout}
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
            disabled={creating || hasReachedProjectLimit}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={creating || hasReachedProjectLimit}
          >
            {creating ? "Creating..." : "Add"}
          </button>
        </form>

        <h2 className="text-lg font-semibold mb-2">Your Projects</h2>

        {loading && <p>Loading...</p>}

        {!loading && projects.length === 0 && (
          <p className="text-gray-500">You don’t have any projects yet.</p>
        )}

        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project._id}
              className="p-4 border rounded-md flex justify-between items-start"
            >
              {editingProjectId === project._id ? (
                <form
                  onSubmit={handleUpdateProject}
                  className="flex flex-col gap-2 w-full"
                >
                  <input
                    value={editProjectName}
                    onChange={(e) => setEditProjectName(e.target.value)}
                    className="p-2 border rounded-md"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProjectId(null)}
                      className="bg-gray-300 px-3 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <Link to={`/projects/${project._id}`} className="flex-1">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-gray-500">
                      Created on{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </Link>
                  <div className="flex flex-col gap-1 text-sm text-right">
                    <button
                      onClick={() => handleStartEdit(project)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
