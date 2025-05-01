import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup";

import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import PublicRoute from "./routes/PublicRoute";
import ProjectTasks from "./pages/ProjectTasks";

function App() {
  const restore = useAuthStore((state) => state.restoreFromStorage);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    restore();
  }, [restore]);

  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <PrivateRoute>
              <ProjectTasks />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
