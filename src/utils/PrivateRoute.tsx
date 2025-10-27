// PrivateRoute.tsx - Versión mejorada
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'guarda'; // ← Opcional
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si hay rol requerido, validarlo (opcional por ahora)
  if (requiredRole) {
    // Lógica temporal de roles
    const userRole = user?.role || 'admin';
    if (userRole !== requiredRole) {
      return <div>🔒 No tienes acceso a esta sección</div>;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;