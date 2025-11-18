import React, { useState } from "react";
import { reportesService, descargarPdf } from "../../services/reportesService";

const Reportes: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDescargar = async (
    tipo: "ocupacion" | "visitantes" | "correspondencias" | "usuarios",
    desde?: string,
    hasta?: string
  ) => {
    try {
      setLoading(tipo);
      setError(null);

      let blob: Blob;
      let nombre: string;

      switch (tipo) {
        case "ocupacion":
          blob = await reportesService.descargarOcupacion();
console.log("Tipo recibido:", blob);
console.log("Es instancia de Blob?", blob instanceof Blob);

          nombre = `Reporte-Ocupacion-${new Date().toISOString().split("T")[0]}.pdf`;
          break;

        case "visitantes":
          blob = await reportesService.descargarVisitantes(desde, hasta);
          nombre = `Reporte-Visitantes-${new Date().toISOString().split("T")[0]}.pdf`;
          break;

        case "correspondencias":
          blob = await reportesService.descargarCorrespondencias(desde, hasta);
          nombre = `Reporte-Correspondencias-${new Date().toISOString().split("T")[0]}.pdf`;
          break;

        case "usuarios":
          blob = await reportesService.descargarUsuarios();
          nombre = `Reporte-Usuarios-${new Date().toISOString().split("T")[0]}.pdf`;
          break;

        default:
          throw new Error("Tipo de reporte inválido");
      }

      descargarPdf(blob, nombre);

    } catch (err) {
      console.error(err);
      setError("Error al descargar el reporte. Revisa consola para más detalles.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📊 Reportes del Sistema</h1>
      <p className="text-gray-600 mb-6">
        Consulta y exporta estadísticas de residentes, guardas, visitas y correspondencias.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* --------------------- OCUPACIÓN --------------------- */}
        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">🏠 Ocupación de Unidades</h2>
          <p className="text-gray-600 text-sm">
            Visualiza cuántas unidades están ocupadas o desocupadas.
          </p>
          <button
            onClick={() => handleDescargar("ocupacion")}
            disabled={loading === "ocupacion"}
            className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded"
          >
            {loading === "ocupacion" ? "Descargando..." : "Descargar PDF"}
          </button>
        </div>

        {/* --------------------- VISITANTES --------------------- */}
        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">👮 Control de Visitantes</h2>
          <p className="text-gray-600 text-sm">
            Consulta los ingresos registrados por los guardas.
          </p>
          <button
            onClick={() => handleDescargar("visitantes")}
            disabled={loading === "visitantes"}
            className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded"
          >
            {loading === "visitantes" ? "Descargando..." : "Descargar PDF"}
          </button>
        </div>

        {/* --------------------- CORRESPONDENCIAS --------------------- */}
        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">📦 Correspondencias</h2>
          <p className="text-gray-600 text-sm">
            Revisa los paquetes entregados y pendientes de retiro.
          </p>
          <button
            onClick={() => handleDescargar("correspondencias")}
            disabled={loading === "correspondencias"}
            className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded"
          >
            {loading === "correspondencias" ? "Descargando..." : "Descargar PDF"}
          </button>
        </div>

        {/* --------------------- USUARIOS --------------------- */}
        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">👤 Usuarios del Sistema</h2>
          <p className="text-gray-600 text-sm">
            Genera reportes de administradores, guardas y residentes activos.
          </p>
          <button
            onClick={() => handleDescargar("usuarios")}
            disabled={loading === "usuarios"}
            className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded"
          >
            {loading === "usuarios" ? "Descargando..." : "Descargar PDF"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Reportes;
