import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel Principal</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>👥 Residentes</h3>
          <p>Gestiona la información de los residentes registrados.</p>
        </div>
        <div className="dashboard-card">
          <h3>🧑‍💼 Usuarios</h3>
          <p>Administra cuentas de administradores y vigilantes.</p>
        </div>
        <div className="dashboard-card">
          <h3>🏢 Unidades</h3>
          <p>Consulta las torres y apartamentos registrados.</p>
        </div>
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🏠 Dashboard - ViviGest</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD DE CORRESPONDENCIA */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-4">📬 Correspondencia</h3>
          <p className="text-gray-600 mb-4">Gestionar entrada y salida de correspondencia</p>
          <button 
            onClick={() => navigate('/correspondencia')}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
          >
            Ir a Correspondencia
          </button>
        </div>

        {/* OTROS MÓDULOS */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold mb-4">👤 Usuarios</h3>
          <p className="text-gray-600 mb-4">Gestionar usuarios del sistema</p>
          <button className="bg-gray-500 text-white px-4 py-2 rounded w-full opacity-50">
            Próximamente...
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold mb-4">🏢 Unidades</h3>
          <p className="text-gray-600 mb-4">Gestionar torres y unidades</p>
          <button className="bg-gray-500 text-white px-4 py-2 rounded w-full opacity-50">
            Próximamente...
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