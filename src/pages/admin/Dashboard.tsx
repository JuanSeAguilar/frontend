import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Datos de ejemplo para las tarjetas
  const stats = [
    { 
      title: 'Correspondencia Pendiente', 
      value: '12', 
      icon: '📬', 
      color: 'from-blue-500 to-cyan-500',
      onClick: () => navigate('/admin/correspondencia')
    },
    { 
      title: 'Residentes Activos', 
      value: '45', 
      icon: '👥', 
      color: 'from-green-500 to-emerald-500',
      onClick: () => navigate('/admin/residentes')
    },
    { 
      title: 'Unidades Totales', 
      value: '60', 
      icon: '🏘️', 
      color: 'from-purple-500 to-pink-500',
      onClick: () => navigate('/admin/unidades')
    },
    { 
      title: 'Visitantes Hoy', 
      value: '8', 
      icon: '👤', 
      color: 'from-orange-500 to-red-500',
      onClick: () => navigate('/admin/reportes')
    }
  ];

  const recentActivities = [
    { id: 1, action: 'Nueva correspondencia', unit: 'Torre A - 101', time: 'Hace 5 min', icon: '📬' },
    { id: 2, action: 'Correspondencia entregada', unit: 'Torre B - 205', time: 'Hace 15 min', icon: '✅' },
    { id: 3, action: 'Residente registrado', unit: 'Torre C - 302', time: 'Hace 1 hora', icon: '👥' },
    { id: 4, action: 'Visita registrada', unit: 'Torre A - 110', time: 'Hace 2 horas', icon: '👤' }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1>📊 Dashboard</h1>
            <p>Resumen general del conjunto residencial</p>
          </div>
          <div className="header-actions">
            <span className="welcome-text">Bienvenido, Administrador</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Content Grid */}
      <div className="content-grid">
        {/* Actividad Reciente */}
        <div className="content-card">
          <h2>📈 Actividad Reciente</h2>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <h4>{activity.action}</h4>
                  <p>{activity.unit}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="content-card">
          <h2>⚡ Acciones Rápidas</h2>
          <div className="quick-actions">
            <button 
              onClick={() => navigate('/admin/correspondencia/nueva')}
              className="quick-action-btn"
            >
              <span className="action-icon">📬</span>
              <span>Registrar Correspondencia</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/residentes')}
              className="quick-action-btn"
            >
              <span className="action-icon">👥</span>
              <span>Gestionar Residentes</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/unidades')}
              className="quick-action-btn"
            >
              <span className="action-icon">🏘️</span>
              <span>Ver Unidades</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/reportes')}
              className="quick-action-btn"
            >
              <span className="action-icon">📈</span>
              <span>Generar Reporte</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
        }

        .page-header {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title-section h1 {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg, #1e40af, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 8px 0;
        }

        .title-section p {
          color: #64748b;
          margin: 0;
          font-size: 16px;
        }

        .welcome-text {
          color: #475569;
          font-weight: 600;
          font-size: 14px;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: linear-gradient(135deg, var(--tw-gradient-stops));
          color: white;
          padding: 24px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .stat-icon {
          font-size: 40px;
          opacity: 0.9;
        }

        .stat-content h3 {
          font-size: 32px;
          font-weight: bold;
          margin: 0 0 4px 0;
        }

        .stat-content p {
          margin: 0;
          opacity: 0.9;
          font-size: 14px;
        }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        .content-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }

        .content-card h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 20px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Activity List */
        .activity-list {
          space-y: 16px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          font-size: 20px;
          background: #f8fafc;
          padding: 8px;
          border-radius: 10px;
        }

        .activity-content h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .activity-content p {
          margin: 0;
          font-size: 12px;
          color: #64748b;
        }

        .activity-time {
          margin-left: auto;
          font-size: 11px;
          color: #94a3b8;
          white-space: nowrap;
        }

        /* Quick Actions */
        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .quick-action-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
        }

        .quick-action-btn:hover {
          border-color: #3b82f6;
          background: #f8fafc;
          transform: translateX(4px);
        }

        .action-icon {
          font-size: 20px;
        }

        .quick-action-btn span:last-child {
          font-weight: 500;
          color: #1e293b;
        }

        /* Gradient classes for stats */
        .from-blue-500 { --tw-gradient-from: #3b82f6; }
        .to-cyan-500 { --tw-gradient-to: #06b6d4; }
        .from-green-500 { --tw-gradient-from: #10b981; }
        .to-emerald-500 { --tw-gradient-to: #059669; }
        .from-purple-500 { --tw-gradient-from: #8b5cf6; }
        .to-pink-500 { --tw-gradient-to: #ec4899; }
        .from-orange-500 { --tw-gradient-from: #f97316; }
        .to-red-500 { --tw-gradient-to: #ef4444; }
      `}</style>
    </div>
  );
};

export default Dashboard;