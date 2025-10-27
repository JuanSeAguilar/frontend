import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  requiredRole?: "Administrador" | "Guarda" | "Residente";
}

const PrivateRoute: React.FC<Props> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && !(user?.roles || []).includes(requiredRole)) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default PrivateRoute;
