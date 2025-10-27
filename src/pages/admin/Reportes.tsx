import React from "react";

const Reportes: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📊 Reportes del Sistema</h1>
      <p className="text-gray-600 mb-6">
        Aquí puedes consultar y exportar estadísticas de residentes, guardas,
        visitas y correspondencias.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">🏠 Ocupación de Unidades</h2>
          <p className="text-gray-600 text-sm">
            Visualiza cuántas unidades están ocupadas o desocupadas.
          </p>
          <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
            Ver Reporte
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">👮 Control de Visitantes</h2>
          <p className="text-gray-600 text-sm">
            Consultar los ingresos y salidas registrados por los guardas.
          </p>
          <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
            Ver Reporte
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">📦 Correspondencias</h2>
          <p className="text-gray-600 text-sm">
            Revisa los paquetes entregados y pendientes de retiro.
          </p>
          <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
            Ver Reporte
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">👤 Usuarios del Sistema</h2>
          <p className="text-gray-600 text-sm">
            Genera reportes de administradores, guardas y residentes activos.
          </p>
          <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
            Ver Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
