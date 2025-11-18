import React, { useEffect, useState } from "react";
import { visitaService } from "../../services/visitaService";

type Visita = {
  idVisita: string;                // es GUID, no number
  visitante: string;
  documento: string;               // viene ya junto (si quieres, luego lo separas)
  torre: string;
  unidad: string;
  motivo: string;
  fecha: string;                   // <- ESTE es el campo correcto
  placaVehiculo?: string | null;
};

const ListaVisitas: React.FC = () => {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarVisitas = async () => {
      try {
        const data = await visitaService.obtenerVisitas();
        setVisitas(data);
      } catch {
        alert("❌ Error al cargar las visitas");
      } finally {
        setLoading(false);
      }
    };
    cargarVisitas();
  }, []);

  const fmtFecha = (val?: string) => {
    if (!val) return "—";
    const d = new Date(val);
    return isNaN(d.getTime()) ? "—" : d.toLocaleString();
  };

  if (loading) return <p style={{ textAlign: "center" }}>Cargando visitas...</p>;

  return (
    <div className="visitas-container">
      <div className="card">
        <h2>📋 Historial de Visitas</h2>

        {visitas.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748b" }}>
            No hay visitas registradas aún.
          </p>
        ) : (
          <table className="visitas-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Torre</th>
                <th>Unidad</th>
                <th>Motivo</th>
                <th>Fecha</th>
                <th>Vehículo</th>
              </tr>
            </thead>
            <tbody>
              {visitas.map((v) => (
                <tr key={v.idVisita}>
                  <td>{v.visitante}</td>
                  <td>{v.documento}</td>
                  <td>{v.torre}</td>
                  <td>{v.unidad}</td>
                  <td>{v.motivo}</td>
                  <td>{fmtFecha(v.fecha)}</td>
                  <td>{(v.placaVehiculo || "").trim() || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        )}
        <button
                onClick={visitaService.generarReporte}
                className="btn-reporte"
              >
                📄 Ver reporte PDF
              </button>
      </div>
      <style>{`
        .visitas-container {
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

        .btn-reporte {
          background: #2563eb;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .btn-reporte:hover {
          background: #1e40af;
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

export default ListaVisitas;
