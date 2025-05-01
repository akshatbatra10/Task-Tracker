import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}
