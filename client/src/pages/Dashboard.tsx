import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { getProjects, Project } from "../services/projectService";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

        <h2 className="text-lg font-semibold mb-2">Your Projects</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && projects.length === 0 && (
          <p className="text-gray-500">You don’t have any projects yet.</p>
        )}

        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project._id}
              className="p-4 border rounded-md hover:bg-gray-50"
            >
              <div className="font-medium">{project.name}</div>
              <div className="text-sm text-gray-500">
                Created on {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
