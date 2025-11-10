import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DashboardStats, ActividadReciente } from '../../services/dashboardService';
import { dashboardService } from '../../services/dashboardService';

const DashboardGuarda: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    correspondenciaPendiente: 0,
    visitantesHoy: 0,
    entregasHoy: 0
  });
  const [actividadReciente, setActividadReciente] = useState<ActividadReciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      setLoading(true);
      
      const [statsData, actividadData] = await Promise.all([
        dashboardService.getStats().catch(() => ({
          correspondenciaPendiente: 0,
          visitantesHoy: 0,
          entregasHoy: 0
        })),
        dashboardService.getActividadReciente().catch(() => [])
      ]);
      
      setStats(statsData);
      setActividadReciente(actividadData);
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    { 
      title: 'Correspondencia Pendiente', 
      value: stats.correspondenciaPendiente, 
      icon: '📬', 
      color: 'blue',
      onClick: () => navigate('/Guarda/correspondencia-pendiente')
    },
    { 
      title: 'Visitantes Hoy', 
      value: stats.visitantesHoy, 
      icon: '👤', 
      color: 'green',
      onClick: () => navigate('/Guarda/visitas')
    },
    { 
      title: 'Entregas Hoy', 
      value: stats.entregasHoy, 
      icon: '✅', 
      color: 'purple',
      onClick: () => navigate('/Guarda/correspondencia-pendiente')
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

  const formatTiempo = (fechaString: string) => {
    const fecha = new Date(fechaString);
    const ahora = new Date();
    const diffMs = ahora.getTime() - fecha.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    
    return fecha.toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="dashboard-guarda">
        <div className="container">
          <div className="loading">
            <div className="spinner">⏳</div>
            <p>Cargando datos en tiempo real...</p>
          </div>
        </div>
        <style>{`
          .dashboard-guarda {
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .loading {
            text-align: center;
            padding: 60px 20px;
          }
          .spinner {
            font-size: 48px;
            margin-bottom: 16px;
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-guarda">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="title-section">
            <h1>🛡️ Dashboard Guarda</h1>
            <p>Control y gestión de seguridad - Datos en tiempo real</p>
          </div>
          <div className="welcome">
            <span>Buen trabajo, Guarda!</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {statsCards.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card"
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
            {actividadReciente.length === 0 ? (
              <div className="empty-activity">
                <div className="empty-icon">📊</div>
                <p>No hay actividad reciente</p>
              </div>
            ) : (
              actividadReciente.map((actividad) => (
                <div key={actividad.id} className="activity-item">
                  <div className="activity-icon">{actividad.icono}</div>
                  <div className="activity-content">
                    <h4>{actividad.titulo}</h4>
                    <p>{actividad.descripcion}</p>
                  </div>
                  <span className="time">{formatTiempo(actividad.fecha)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-guarda {
          background: #f8fafc;
          min-height: 100vh;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          margin-bottom: 30px;
          border: 1px solid #e2e8f0;
        }
        
        .title-section h1 {
          margin: 0;
          color: #2d3748;
          font-size: 1.8rem;
          font-weight: 700;
        }
        
        .title-section p {
          margin: 5px 0 0 0;
          color: #718096;
          font-size: 0.95rem;
        }
        
        .welcome {
          background: #48bb78;
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
        }
        
        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
          border: 1px solid #e2e8f0;
        }
        
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          border-color: #cbd5e0;
        }
        
        .stat-icon {
          font-size: 2.5rem;
          padding: 15px;
          border-radius: 12px;
          background: #bee3f8;
        }
        
        .stat-content h3 {
          margin: 0;
          font-size: 2.2rem;
          font-weight: 700;
          color: #2d3748;
        }
        
        .stat-content p {
          margin: 5px 0 0 0;
          color: #718096;
          font-size: 0.9rem;
        }
        
        /* Sections */
        .section {
          background: white;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 25px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }
        
        .section h2 {
          margin: 0 0 20px 0;
          color: #2d3748;
          font-size: 1.4rem;
          font-weight: 600;
        }
        
        /* Actions Grid */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
        }
        
        .action-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }
        
        .action-card:hover {
          border-color: #667eea;
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
        }
        
        .action-icon {
          font-size: 1.8rem;
          margin-top: 2px;
        }
        
        .action-content h4 {
          margin: 0 0 8px 0;
          color: #2d3748;
          font-size: 1.05rem;
          font-weight: 600;
        }
        
        .action-content p {
          margin: 0;
          color: #718096;
          font-size: 0.9rem;
        }
        
        /* Activity List */
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .activity-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 18px;
          background: #f8fafc;
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }
        
        .activity-item:hover {
          background: white;
          transform: translateX(3px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        
        .activity-icon {
          font-size: 1.5rem;
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-content h4 {
          margin: 0 0 5px 0;
          color: #2d3748;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .activity-content p {
          margin: 0;
          color: #718096;
          font-size: 0.9rem;
        }
        
        .time {
          color: #a0aec0;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .empty-activity {
          text-align: center;
          padding: 50px 20px;
          color: #718096;
        }
        
        .empty-icon {
          font-size: 3.5rem;
          margin-bottom: 15px;
          opacity: 0.5;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .dashboard-guarda {
            padding: 15px;
          }
          
          .header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .actions-grid {
            grid-template-columns: 1fr;
          }
          
          .activity-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          
          .time {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardGuarda;