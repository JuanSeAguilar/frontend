import React, { useEffect, useState } from "react";
import { correspondenciaService } from "../../services/correspondenciaService";

type Correspondencia = {
  idCorrespondencia: string;
  tipoCorrespondencia: string;
  fechaRecepcion: string;
  estado: string;
  observacion?: string;
  remitente?: string;
  registradoPor?: string;
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando correspondencias...</p>
      </div>
    );
  }

  return (
    <div className="mis-correspondencias-page">
      <div className="container">
        <div className="header">
          <h2>📦 Mis Correspondencias</h2>
          <div className="filtro">
            <label>
              <input
                type="checkbox"
                checked={soloPendiente}
                onChange={(e) => setSoloPendiente(e.target.checked)}
              />
              Mostrar solo pendientes
            </label>
          </div>
        </div>

        {correspondencias.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No hay correspondencias</h3>
            <p>{soloPendiente ? "No tienes pendientes." : "Todo está al día."}</p>
          </div>
        ) : (
          <div className="correspondencias-grid">
            {correspondencias.map((c) => (
              <div key={c.idCorrespondencia} className="correspondencia-card">
                <div className="card-header">
                  <div className="tipo-icon">
                    {c.tipoCorrespondencia === "Paquete" ? "📦" : c.tipoCorrespondencia === "Carta" ? "📧" : "📄"}
                  </div>
                  <h3>{c.tipoCorrespondencia}</h3>
                  <span className={`estado-badge ${c.estado.toLowerCase()}`}>{c.estado}</span>
                </div>
                <div className="card-body">
                  <div className="info-row">
                    <span className="label">📅 Fecha:</span>
                    <span className="value">{new Date(c.fechaRecepcion).toLocaleDateString()}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">👤 Remitente:</span>
                    <span className="value">{c.remitente || "N/A"}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">👮 Registrado por:</span>
                    <span className="value">{c.registradoPor || "Desconocido"}</span>
                  </div>
                  {c.observacion && (
                    <div className="info-row">
                      <span className="label">📝 Observaciones:</span>
                      <span className="value">{c.observacion}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .mis-correspondencias-page {
          min-height: 100vh;
          background: white;  /* ← CAMBIO: Fondo blanco */
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
        }

        .header h2 {
          margin: 0;
          color: #1e293b;
          font-size: 28px;
          font-weight: bold;
        }

        .filtro {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filtro label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          color: #475569;
          cursor: pointer;
        }

        .filtro input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #667eea;
        }

        .correspondencias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }

        .correspondencia-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e2e8f0;
        }

        .correspondencia-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .tipo-icon {
          font-size: 30px;
        }

        .card-header h3 {
          margin: 0;
          color: #1e293b;
          font-size: 20px;
          flex: 1;
        }

        .estado-badge {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .estado-badge.pendiente { background: #fef3c7; color: #d97706; }
        .estado-badge.notificado { background: #dbeafe; color: #2563eb; }
        .estado-badge.entregado { background: #dcfce7; color: #16a34a; }

        .card-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .label {
          font-weight: 600;
          color: #475569;
          font-size: 14px;
        }

        .value {
          color: #1e293b;
          font-size: 14px;
          text-align: right;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: #64748b;
        }

        .empty-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          margin: 0 0 10px 0;
          font-size: 24px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 20px;
          color: #475569;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .container {
            padding: 20px;
            margin: 10px;
          }

          .header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .correspondencias-grid {
            grid-template-columns: 1fr;
          }

          .correspondencia-card {
            padding: 20px;
          }

          .card-header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default MisCorrespondencias;
