import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import AdminLayout from "./components/layouts/AdminLayout";
import GuardaLayout from "./components/layouts/GuardaLayout";
import ResidenteLayout from "./components/layouts/ResidenteLayout";

// Páginas públicas
import Login from "./pages/Login";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import Reportes from "./pages/admin/Reportes";
import Unidades from "./pages/admin/Unidades";
import Residente from "./pages/admin/Residente";
import CorrespondenciaList from "./pages/admin/correspondencia/CorrespondenciaList";
import CorrespondenciaForm from "./pages/admin/correspondencia/CorrespondenciaForm";
import RegistroUsuario from "./pages/RegistroUsuario";
import RegistroResidente from "./pages/RegistroResidente";
import GenerarCargos from "./components/GenerarCargos.js";
import DashboardPagosAdmin from './pages/admin/DashboardPagosAdmin';


// Guarda
import DashboardGuarda from "./pages/Guarda/DashboardGuarda";
import RegistroVisita from "./pages/Guarda/RegistroVisita";
import ListaVisitas from "./pages/Guarda/ListaVisitas";
import ControlVisitantes from "./pages/Guarda/ControlVisitantes";
import RegistroCorrespondencia from "./pages/Guarda/RegistroCorrespondencia";
import CorrespondenciaPendiente from "./pages/Guarda/CorrespondenciaPendiente";
import ValidarAutorizado from "./pages/Guarda/ValidarAutorizado";

// Residente
import DashboardResidente from "./pages/Residente/DashboardResidente";
import AutorizadosList from "./pages/Residente/AutorizadosList";
import MisCorrespondencias from "./pages/Residente/MisCorrespondencias";
import PagoPage from './pages/PagoPages';



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
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="correspondencia" >
              <Route index element={<CorrespondenciaList />} />
              <Route path="nuevo" element={<CorrespondenciaForm />} />
              <Route path="editar/:id" element={<CorrespondenciaForm />} />
            </Route>
            <Route path="reportes" element={<Reportes />} />
            <Route path="unidades" element={<Unidades />} />
            <Route path="residente" element={<Residente />} />
            <Route path="registro-usuario" element={<RegistroUsuario />} />
            <Route path="registro-residente" element={<RegistroResidente />} />
            <Route path="/admin/generar-cargos" element={<GenerarCargos />} />
            <Route path="/admin/pagos" element={<DashboardPagosAdmin />} />
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
            <Route path="DashboardGuarda" element={<DashboardGuarda />} />
            <Route path="registro-visita" element={<RegistroVisita />} />
            <Route path="visitas" element={<ListaVisitas />} />
            <Route path="control-visitantes" element={<ControlVisitantes />} />
            <Route path="registro-correspondencia" element={<RegistroCorrespondencia />} />
            <Route path="correspondencia-pendiente" element={<CorrespondenciaPendiente />} />
            <Route path="validar-autorizado" element={<ValidarAutorizado />} />
          </Route>

          {/* ===================== RESIDENTE ===================== */}
          
          <Route
            path="/residente"
            element={ 
              <ProtectedRoute role="Residente">
                <ResidenteLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardResidente />} />
            <Route path="dashboard" element={<DashboardResidente />} />
            <Route path="autorizados" element={<AutorizadosList />} />
            <Route path="mis-correspondencias" element={<MisCorrespondencias />} />
            <Route path="pagos" element={<PagoPage />} /> 
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
