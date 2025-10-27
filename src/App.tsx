import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import AdminLayout from "./components/layouts/AdminLayout";
import GuardaLayout from "./components/layouts/GuardaLayout";

// Páginas públicas
import Login from "./pages/Login";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import Reportes from "./pages/admin/Reportes";
import Unidades from "./pages/admin/Unidades";
import Residente from "./pages/admin/Residente";

// Guarda
import DashboardGuarda from "./pages/Guarda/DashboardGuarda";
import RegistroVisita from "./pages/Guarda/RegistroVisita";
import ListaVisitas from "./pages/Guarda/ListaVisitas";
import ControlVisitantes from "./pages/Guarda/ControlVisitantes";
import RegistroCorrespondencia from "./pages/Guarda/RegistroCorrespondencia";
import CorrespondenciaPendiente from "./pages/Guarda/CorrespondenciaPendiente";

// Residente
import DashboardResidente from "./pages/Residente/DashboardResidente";
import AutorizadosList from "./pages/Residente/AutorizadosList";
import MisCorrespondencias from "./pages/Residente/MisCorrespondencias";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Público */}
          <Route path="/login" element={<Login />} />

          {/* ===================== ADMIN ===================== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Administrador">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="unidades" element={<Unidades />} />
            <Route path="residente" element={<Residente />} />
          </Route>

          {/* ===================== GUARDA ===================== */}
          <Route
            path="/Guarda"
            element={
              <ProtectedRoute role="Guarda">
                <GuardaLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardGuarda />} />
            <Route path="registro-visita" element={<RegistroVisita />} />
            <Route path="visitas" element={<ListaVisitas />} />
            <Route path="control-visitantes" element={<ControlVisitantes />} />
            <Route path="registro-correspondencia" element={<RegistroCorrespondencia />} />
            <Route path="correspondencia-pendiente" element={<CorrespondenciaPendiente />} />
          </Route>

          {/* ===================== RESIDENTE ===================== */}
          <Route
            path="/residente"
            element={
              <ProtectedRoute role="Residente">
                {/* Si tienes un layout para residente, colócalo aquí; si no, deja un fragmento */}
                <React.Fragment />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardResidente />} />
            <Route path="autorizados" element={<AutorizadosList />} />
            <Route path="mis-correspondencias" element={<MisCorrespondencias />} />
          </Route>

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
