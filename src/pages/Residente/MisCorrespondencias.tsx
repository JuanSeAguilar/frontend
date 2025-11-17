import React, { useEffect, useState } from "react";
import { correspondenciaService } from "../../services/correspondenciaService";

type Correspondencia = {
  idCorrespondencia: string;          // ✅ GUID => string
  tipoCorrespondencia: string;
  fechaRecepcion: string;
  estado: string;
  observacion?: string;
};

const MisCorrespondencias: React.FC = () => {
  const [correspondencias, setCorrespondencias] = useState<Correspondencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [soloPendiente, setSoloPendiente] = useState(false);

  const cargar = async (onlyPending: boolean) => {
    setLoading(true);
    try {
      const data = await correspondenciaService.obtenerPorResidente(onlyPending);
      setCorrespondencias(data);
    } catch {
      alert("❌ Error al cargar la correspondencia");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar(soloPendiente);
  }, [soloPendiente]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  return (
    <div className="correspondencia-container">
      <div className="card">
        <h2>📦 Mi Correspondencia</h2>

        <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
          <label style={{ fontSize: 14, color: "#475569", display: "flex", gap: 6, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={soloPendiente}
              onChange={(e) => setSoloPendiente(e.target.checked)}
            />
            Mostrar solo pendiente
          </label>
        </div>

        {correspondencias.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748b" }}>
            {soloPendiente
              ? "No tienes correspondencia pendiente."
              : "No tienes correspondencia registrada."}
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Fecha de recepción</th>
                <th>Estado</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {correspondencias.map((c) => (
                <tr key={c.idCorrespondencia}>
                  <td>{c.tipoCorrespondencia}</td>
                  <td>{new Date(c.fechaRecepcion).toLocaleDateString()}</td>
                  <td>{c.estado}</td>
                  <td>{c.observacion || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .correspondencia-container {
          background: #f9fafb;
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          width: 100%;
          max-width: 900px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }
        h2 {
          color: #1e3a8a;
          text-align: center;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          border-bottom: 1px solid #e2e8f0;
          text-align: left;
        }
        th {
          background: #f1f5f9;
          font-weight: 600;
          color: #475569;
        }
        tr:hover {
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default MisCorrespondencias;
