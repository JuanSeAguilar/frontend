import React, { useState, useEffect } from "react";
import { fetchTorres, fetchUnidadesDetallesByTorre, type Torre, type UnidadDetalle } from "../../services/unidadService";

interface UnidadExtendida {
  id: string;
  torre: string;
  numero: string;
  residente: string;
  telefono: string;
  email: string;
  estado: "Ocupado" | "Desocupado" | "Mantenimiento";
}

const Unidades: React.FC = () => {
  const [torres, setTorres] = useState<Torre[]>([]);
  const [unidades, setUnidades] = useState<UnidadExtendida[]>([]);
  const [selectedTorreId, setSelectedTorreId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar torres al montar el componente
  useEffect(() => {
    const loadTorres = async () => {
      try {
        setLoading(true);
        const data = await fetchTorres();
        setTorres(data);
        if (data.length > 0) {
          setSelectedTorreId(data[0].idTorre);
        }
      } catch (err) {
        setError("Error al cargar las torres");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTorres();
  }, []);

  // Cargar unidades cuando cambie la torre seleccionada
  useEffect(() => {
    if (!selectedTorreId) return;

    const loadUnidades = async () => {
      try {
        setLoading(true);
        const data = await fetchUnidadesDetallesByTorre(selectedTorreId);
        
        // Mapear datos del backend al formato esperado
        const unidadesFormateadas: UnidadExtendida[] = data.map((u) => ({
          id: u.idUnidad,
          torre: torres.find(t => t.idTorre === selectedTorreId)?.nombre || "Desconocida",
          numero: u.codigo,
          residente: u.residente?.nombre || "", // Nombre del residente
          telefono: "", // Si lo necesitas, agrega al backend
          email: u.residente?.email || "", // Email del residente
          estado: u.residente ? "Ocupado" : "Desocupado", // Determina el estado
        }));

        setUnidades(unidadesFormateadas);
        setError(null);
      } catch (err) {
        setError("Error al cargar las unidades");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUnidades();
  }, [selectedTorreId, torres]);

  const colorEstado = (estado: string) => {
    switch (estado) {
      case "Ocupado":
        return "bg-green-500";
      case "Desocupado":
        return "bg-gray-400";
      case "Mantenimiento":
        return "bg-yellow-400";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🏘️ Gestión de Unidades</h1>

      {/* Selector de Torres */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Torre:
        </label>
        <select
          value={selectedTorreId}
          onChange={(e) => setSelectedTorreId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Selecciona una torre --</option>
          {torres.map((torre) => (
            <option key={torre.idTorre} value={torre.idTorre}>
              Torre {torre.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Indicador de carga */}
      {loading && <p className="text-blue-600 font-semibold">Cargando unidades...</p>}

      {/* Indicador de error */}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Grid de Unidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {unidades.length > 0 ? (
          unidades.map((u) => (
            <div key={u.id} className="bg-white shadow rounded-lg p-4 border">
              <h2 className="text-xl font-semibold mb-2">
                Torre {u.torre} - {u.numero}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {u.residente ? `👤 ${u.residente}` : "🏠 Vacante"}
              </p>
              {u.email && <p className="text-xs text-gray-500">📧 {u.email}</p>}
              <span
                className={`inline-block px-2 py-1 text-white text-xs rounded mt-2 ${colorEstado(
                  u.estado
                )}`}
              >
                {u.estado}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay unidades disponibles para esta torre.</p>
        )}
      </div>
    </div>
  );
};

export default Unidades;