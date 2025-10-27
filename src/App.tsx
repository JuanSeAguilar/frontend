import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// 🧩 Páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // 👈 Dashboard administrador
import RegistroUsuario from "./pages/RegistroUsuario";
import RegistroResidente from "./pages/RegistroResidente";
import ResidentesList from "./pages/Residenteslist";
import DashboardGuarda from "./pages/Guarda/DashboardGuarda"; // 👈 Dashboard del guarda
import RegistroVisita from "./pages/Guarda/RegistroVisita"; // 👈 Registro de visita
import ListaVisitas from "./pages/Guarda/ListaVisitas"; // 👈 Lista de visitas
import DashboardResidente from "./pages/Residente/DashboardResidente";
import AutorizadosList from "./pages/Residente/AutorizadosList";

const Unauthorized = () => (
  <h3 style={{ textAlign: "center", marginTop: 40 }}>No autorizado</h3>
);

// 🔎 helper para decidir home según roles (prioridad: Admin > Guarda > Residente)
const homeByRoles = (roles: string[]) => {
  const r = roles.map(x => x.toLowerCase());
  if (r.includes("administrador")) return "/dashboard";
  if (r.includes("guarda"))        return "/guarda/dashboard";
  if (r.includes("residente"))     return "/residente/dashboard";
  return "/unauthorized";
};

// 🔁 Redirección a home por rol si ya está autenticado
const RoleHomeRedirect: React.FC = () => {
  const { isAuthenticated, auth } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={homeByRoles(auth.roles)} replace />;
};

// 🔹 Barra de navegación superior
const Navbar: React.FC = () => {
  const { auth, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const has = (role: string) => auth.roles.some(r => r.toLowerCase() === role.toLowerCase());

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* DASHBOARD según rol */}
        {has("Administrador") && (
          <Link to="/dashboard" className="nav-link">
            Dashboard Admin
          </Link>
        )}

        {has("Guarda") && (
          <Link to="/guarda/dashboard" className="nav-link">
            Panel del Guarda
          </Link>
        )}

        {/* OPCIONES SOLO PARA ADMIN */}
        {has("Administrador") && (
          <>
            <Link to="/residentes" className="nav-link">
              Residentes
            </Link>
            <Link to="/registro-usuario" className="nav-link">
              + Usuario
            </Link>
            <Link to="/registro-residente" className="nav-link">
              + Residente
            </Link>
          </>
        )}
      </div>

      <button className="logout-btn" onClick={logout}>
        Cerrar sesión
      </button>

      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }

        .nav-link:hover {
          opacity: 0.8;
        }

        .logout-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </nav>
  );
};
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";

// Layouts
import AdminLayout from "./components/layouts/AdminLayout";
import GuardaLayout from "./components/layouts/GuardaLayout";

// Páginas de Admin
import Dashboard from "./pages/admin/Dashboard";
import CorrespondenciaList from './pages/admin/correspondencia/CorrespondenciaList'; // ← Aquí está
import CorrespondenciaForm from './pages/admin/correspondencia/CorrespondenciaForm'; // ← Aquí está
import Residentes from "./pages/admin/Residente";
import Unidades from "./pages/admin/Unidades";
import Reportes from "./pages/admin/Reportes";

// Páginas de Guarda
import DashboardGuarda from "./pages/guarda/DashboardGuarda";
import CorrespondenciaPendiente from "./pages/guarda/CorrespondenciaPendiente";
import RegistroCorrespondencia from "./pages/guarda/RegistroCorrespondencia";
import ControlVisitantes from "./pages/guarda/ControlVisitantes";

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ⏩ raíz: manda al dashboard según su rol */}
        <Route path="/" element={<RoleHomeRedirect />} />

        {/* 🔐 Login */}
        <Route path="/login" element={<Login />} />

        {/* 📊 Dashboard principal (Administrador) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="Administrador">
              <Dashboard />
            </ProtectedRoute>
        {/* Ruta pública - Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas de ADMIN */}
        <Route 
          path="/admin/*" 
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="correspondencia" element={<CorrespondenciaList />} />
          <Route path="correspondencia/nueva" element={<CorrespondenciaForm />} />
          <Route path="correspondencia/editar/:id" element={<CorrespondenciaForm />} />
          <Route path="residentes" element={<Residentes />} />
          <Route path="unidades" element={<Unidades />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="" element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Rutas de GUARDA */}
        <Route 
          path="/guarda/*" 
          element={
            <PrivateRoute>
              <GuardaLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<DashboardGuarda />} />
          <Route path="correspondencia" element={<CorrespondenciaPendiente />} />
          <Route path="correspondencia/registrar" element={<RegistroCorrespondencia />} />
          <Route path="visitantes" element={<ControlVisitantes />} />
          <Route path="" element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Rutas legacy - Redirigir a admin */}
        <Route 
          path="/correspondencia" 
          element={
            <PrivateRoute>
              <Navigate to="/admin/correspondencia" replace />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/correspondencia/nueva" 
          element={
            <PrivateRoute>
              <Navigate to="/admin/correspondencia/nueva" replace />
            </PrivateRoute>
          } 
        />

        {/* Ruta por defecto - Redirige al admin dashboard */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Navigate to="/admin/dashboard" replace />
            </PrivateRoute>
          } 
        />

        {/* 👤 Registro de usuario */}
        <Route
          path="/registro-usuario"
          element={
            <ProtectedRoute role="Administrador">
              <RegistroUsuario />
            </ProtectedRoute>
          }
        />

        {/* 🏠 Lista de residentes */}
        <Route
          path="/residentes"
          element={
            <ProtectedRoute role="Administrador">
              <ResidentesList />
            </ProtectedRoute>
          }
        />

        {/* 🧾 Registro de residente */}
        <Route
          path="/registro-residente"
          element={
            <ProtectedRoute role="Administrador">
              <RegistroResidente />
            </ProtectedRoute>
          }
        />

        {/* 🏡 Dashboard del residente */}
        <Route
          path="/residente/dashboard"
          element={
            <ProtectedRoute role="Residente">
              <DashboardResidente />
            </ProtectedRoute>
          }
        />

        {/* 👥 Visitantes autorizados */}
        <Route
          path="/residente/autorizados"
          element={
            <ProtectedRoute role="Residente">
              <AutorizadosList />
            </ProtectedRoute>
          }
        />

        {/* 👮 Panel del Guarda */}
        <Route
          path="/guarda/dashboard"
          element={
            <ProtectedRoute role="Guarda">
              <DashboardGuarda />
            </ProtectedRoute>
          }
        />

        {/* 📝 Registro de visita */}
        <Route
          path="/guarda/registro-visita"
          element={
            <ProtectedRoute role="Guarda">
              <RegistroVisita />
            </ProtectedRoute>
          }
        />

        {/* 📋 Lista de visitas del guarda */}
        <Route
          path="/guarda/lista-visitas"
          element={
            <ProtectedRoute role="Guarda">
              <ListaVisitas />
            </ProtectedRoute>
          }
        />

        {/* 🚫 Página sin permiso */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 🚀 Ruta por defecto */}
        <Route path="*" element={<Login />} />
        
        {/* Ruta por defecto para no autenticados */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;