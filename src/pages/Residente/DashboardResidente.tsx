import React from "react";
import { useNavigate } from "react-router-dom";
import CargosPendientes from "../../components/CargosPendientes";

const DashboardResidente: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h1 className="title">🏠 Panel del Residente</h1>
        <p className="subtitle">
          Bienvenido, aquí puedes gestionar tu información personal, tus
          correspondencias y pagos.
        </p>

        {/* Botones principales */}
        <div className="main-actions">
          <button
            onClick={() => nav("/residente/mis-correspondencias")}
            className="action-btn primary"
          >
            📦 Ver mi correspondencia
          </button>

          <button
            onClick={() => nav("/residente/autorizados")}
            className="action-btn secondary"
          >
            👥 Visitantes autorizados
          </button>

          
        </div>
      </div>

      {/* Sección de cargos pendientes */}
      <div className="section-card">
        <h2 className="section-title">💰 Cargos Pendientes</h2>
        <p className="section-text">
          Consulta tus cuotas y obligaciones pendientes del conjunto.
        </p>
        <CargosPendientes />
      </div>

      {/* ESTILOS */}
      <style>{`
        .dashboard-wrapper {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(135deg, #eef2ff, #dbeafe);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .dashboard-card {
          background: white;
          padding: 36px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
          max-width: 600px;
          width: 100%;
          text-align: center;
        }

        .title {
          font-size: 2rem;
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 1rem;
          color: #475569;
          margin-bottom: 30px;
        }

        .main-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .action-btn {
          padding: 14px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all .25s ease-in-out;
        }

        .primary {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
        }

        .primary:hover {
          box-shadow: 0 6px 18px rgba(99,102,241,0.35);
          transform: translateY(-2px);
        }

        .secondary {
          background: #ffffff;
          border: 2px solid #3b82f6;
          color: #1e3a8a;
        }

        .secondary:hover {
          background: #f0f9ff;
          transform: translateY(-2px);
        }

        .section-card {
          background: white;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          max-width: 700px;
          width: 100%;
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .section-text {
          font-size: 0.95rem;
          color: #475569;
          margin-bottom: 18px;
        }
      `}</style>
    </div>
  );
};

export default DashboardResidente;
