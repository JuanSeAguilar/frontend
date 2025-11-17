import React from "react";
import { useNavigate } from "react-router-dom";
import CargosPendientes from '../../components/CargosPendientes';

const DashboardResidente: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Panel del Residente 🏠</h1>
        <p>Bienvenido, desde aquí puedes consultar tu correspondencia y visitantes.</p>

        <div className="actions">
          <button onClick={() => nav("/residente/mis-correspondencias")} className="btn-primary">
            📦 Mi correspondencia
          </button>
          <button onClick={() => nav("/residente/autorizados")} className="btn-secondary">
            👥 Visitantes autorizados
          </button>
        </div>
      </div>

  
<button onClick={() => nav('/pago')} className="btn-primary">
  💳 Pagar servicios
</button>

<CargosPendientes />


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

export default DashboardResidente;
