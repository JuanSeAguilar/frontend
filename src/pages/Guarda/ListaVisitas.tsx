import React, { useEffect, useState } from "react";
import { visitaService } from "../../services/visitaService";

type Visita = {
  idVisita: number;
  nombreVisitante: string;
  tipoDocumento: string;
  numeroDocumento: string;
  torre: string;
  unidad: string;
  motivo: string;
  fechaIngreso: string;
  placaVehiculo?: string;
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
                  <td>{v.nombreVisitante}</td>
                  <td>
                    {v.tipoDocumento} {v.numeroDocumento}
                  </td>
                  <td>{v.torre}</td>
                  <td>{v.unidad}</td>
                  <td>{v.motivo}</td>
                  <td>{new Date(v.fechaIngreso).toLocaleString()}</td>
                  <td>{v.placaVehiculo || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
