import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardGuarda: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Panel del Vigilante 👮‍♂️</h1>
        <p>Bienvenido al módulo de control de visitantes y correspondencia</p>

        <div className="actions">
          <button onClick={() => nav("/guarda/registro-visita")} className="btn-primary">
            ➕ Registrar Visita
          </button>

          <button onClick={() => nav("/guarda/lista-visitas")} className="btn-secondary">
            📋 Consultar Visitas
          </button>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f8fafc, #e0f2fe);
          padding: 20px;
        }

        .dashboard-card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 500px;
          width: 100%;
        }

        h1 {
          color: #1e3a8a;
          margin-bottom: 12px;
        }

        p {
          color: #475569;
          margin-bottom: 32px;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .btn-primary, .btn-secondary {
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
        }

        .btn-secondary {
          background: white;
          border: 2px solid #3b82f6;
          color: #1e3a8a;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59,130,246,0.3);
        }

        .btn-secondary:hover {
          background: #f0f9ff;
        }
      `}</style>
    </div>
  );
};

export default DashboardGuarda;
