import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🏠 Dashboard - ViviGest</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ADMIN: Reportes */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-2">📊 Reportes</h3>
          <p className="text-gray-600 mb-4">Consulta métricas y estadísticas.</p>
          <button
            onClick={() => navigate("/admin/reportes")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Ver reportes
          </button>
        </div>

        {/* ADMIN: Unidades */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-2">🏢 Unidades</h3>
          <p className="text-gray-600 mb-4">Gestiona torres y apartamentos.</p>
          <button
            onClick={() => navigate("/admin/unidades")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Ir a Unidades
          </button>
        </div>

        {/* ADMIN: Residente */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-2">👥 Residentes</h3>
          <p className="text-gray-600 mb-4">Gestiona la información de residentes.</p>
          <button
            onClick={() => navigate("/admin/residente")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Ver residentes
          </button>
        </div>

        {/* GUARDA: Correspondencia (si usas el mismo dashboard para guarda, deja este acceso) */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-2">📬 Correspondencia</h3>
          <p className="text-gray-600 mb-4">Registro de entrada y salida.</p>
          <button
            onClick={() => navigate("/Guarda/registro-correspondencia")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Registrar correspondencia
          </button>
        </div>
      </div>

      {/* INFO DEL SISTEMA */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-blue-800">¡Bienvenido a ViviGest!</h3>
        <p className="text-blue-600">Sistema de gestión para conjuntos residenciales</p>
      </div>
    </div>
  );
};

export default Dashboard;
