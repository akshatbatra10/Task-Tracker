import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function PublicRoute({ children }: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
