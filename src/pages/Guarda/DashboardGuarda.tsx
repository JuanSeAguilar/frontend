import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardGuarda: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { 
      title: 'Correspondencia Pendiente', 
      value: '8', 
      icon: '📬', 
      color: 'from-blue-500 to-cyan-500',
      onClick: () => navigate('/Guarda/correspondencia-pendiente')
    },
    { 
      title: 'Visitantes Hoy', 
      value: '12', 
      icon: '👤', 
      color: 'from-green-500 to-emerald-500',
      onClick: () => navigate('/Guarda/visitas')
    },
    { 
      title: 'Entregas Hoy', 
      value: '5', 
      icon: '✅', 
      color: 'from-purple-500 to-pink-500',
      onClick: () => navigate('/Guarda/registro-correspondencia')
    }
  ];

  const quickActions = [
    {
      icon: '📬',
      title: 'Registrar Correspondencia',
      description: 'Registrar nueva correspondencia',
      onClick: () => navigate('/Guarda/registro-correspondencia')
    },
    {
      icon: '👤',
      title: 'Registrar Visitante',
      description: 'Registrar ingreso de visitante',
      onClick: () => navigate('/Guarda/registro-visita')
    },
    {
      icon: '📋',
      title: 'Ver Pendientes',
      description: 'Revisar correspondencia pendiente',
      onClick: () => navigate('/Guarda/correspondencia-pendiente')
    }
  ];

  return (
    <div className="dashboard-guarda">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="title-section">
            <h1>🛡️ Dashboard Guarda</h1>
            <p>Control y gestión de seguridad</p>
          </div>
          <div className="welcome">
            <span>Buen trabajo, Guarda!</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`stat-card ${stat.color}`}
              onClick={stat.onClick}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="section">
          <h2>⚡ Acciones Rápidas</h2>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="action-card"
                onClick={action.onClick}
              >
                <div className="action-icon">{action.icon}</div>
                <div className="action-content">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="section">
          <h2>📋 Actividad Reciente</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📬</div>
              <div className="activity-content">
                <h4>Correspondencia registrada</h4>
                <p>Torre A - 101 • Servientrega</p>
              </div>
              <span className="time">Hace 5 min</span>
            </div>
            <div className="activity-item">
              <div className="activity-icon">👤</div>
              <div className="activity-content">
                <h4>Visitante registrado</h4>
                <p>Torre B - 205 • María González</p>
              </div>
              <span className="time">Hace 15 min</span>
            </div>
            <div className="activity-item">
              <div className="activity-icon">✅</div>
              <div className="activity-content">
                <h4>Correspondencia entregada</h4>
                <p>Torre C - 302 • Juan Pérez</p>
              </div>
              <span className="time">Hace 30 min</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-guarda {
          padding: 20px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .title-section h1 {
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(135deg, #059669, #047857);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 8px 0;
        }

        .title-section p {
          color: #64748b;
          margin: 0;
        }

        .welcome span {
          background: #dcfce7;
          color: #065f46;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to));
          color: black;
          padding: 20px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          font-size: 32px;
        }

        .stat-content h3 {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 4px 0;
        }

        .stat-content p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .section {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .section h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 20px 0;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .action-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .action-card:hover {
          border-color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(5, 150, 105, 0.1);
        }

        .action-icon {
          font-size: 24px;
          background: #f0fdf4;
          padding: 12px;
          border-radius: 10px;
        }

        .action-content h4 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .action-content p {
          margin: 0;
          font-size: 12px;
          color: #64748b;
        }

        .activity-list {
          space-y: 12px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          font-size: 18px;
          background: #f8fafc;
          padding: 8px;
          border-radius: 8px;
        }

        .activity-content h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
        }

        .activity-content p {
          margin: 0;
          font-size: 12px;
          color: #64748b;
        }

        .time {
          margin-left: auto;
          font-size: 11px;
          color: #94a3b8;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default DashboardGuarda;
