import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import PrivatePage from "./pages/PrivatePage";
import RegisterUsuario from "./pages/RegisterUsuario";
import RegisterResidente from "./pages/RegisterResidente";

const Unauthorized = () => (
  <h3 style={{ textAlign: "center", marginTop: 40 }}>No autorizado</h3>
);

// 🔹 Barra de navegación dinámica
const Navbar: React.FC = () => {
  const { auth, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <nav className="p-3 bg-dark text-white d-flex justify-content-between">
      <div>
        <Link to="/dashboard" className="btn btn-light me-2">
          Dashboard
        </Link>
        {auth.roles.includes("Administrador") && (
          <>
            <Link to="/registro-usuario" className="btn btn-light me-2">
              Registrar Usuario
            </Link>
            <Link to="/registro-residente" className="btn btn-light">
              Registrar Residente
            </Link>
          </>
        )}
      </div>
      <button className="btn btn-danger" onClick={logout}>
        Cerrar sesión
      </button>
    </nav>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard privado */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PrivatePage />
            </ProtectedRoute>
          }
        />

        {/* Registro de usuarios (admin / guarda) */}
        <Route
          path="/registro-usuario"
          element={
            <ProtectedRoute role="Administrador">
              <RegisterUsuario />
            </ProtectedRoute>
          }
        />

        {/* Registro de residentes */}
        <Route
          path="/registro-residente"
          element={
            <ProtectedRoute role="Administrador">
              <RegisterResidente />
            </ProtectedRoute>
          }
        />

        {/* No autorizado */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Default */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
