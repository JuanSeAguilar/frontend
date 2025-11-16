import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type {
  DashboardStats,
  ActividadReciente,
} from "../../services/dashboardService";
import { dashboardService } from "../../services/dashboardService";

const DashboardGuarda: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    correspondenciaPendiente: 0,
    visitantesHoy: 0,
    entregasHoy: 0,
  });
  const [actividadReciente, setActividadReciente] = useState<
    ActividadReciente[]
  >([]);
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
          entregasHoy: 0,
        })),
        dashboardService.getActividadReciente().catch(() => []),
      ]);

      setStats(statsData);
      setActividadReciente(actividadData);
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Correspondencia pendiente",
      value: stats.correspondenciaPendiente,
      icon: "📬",
      onClick: () => navigate("/Guarda/correspondencia-pendiente"),
    },
    {
      title: "Visitantes hoy",
      value: stats.visitantesHoy,
      icon: "👤",
      onClick: () => navigate("/Guarda/visitas"),
    },
    {
      title: "Entregas hoy",
      value: stats.entregasHoy,
      icon: "✅",
      onClick: () => navigate("/Guarda/correspondencia-pendiente"),
    },
  ];

  const quickActions = [
    {
      icon: "📬",
      title: "Registrar correspondencia",
      description: "Registrar nueva correspondencia",
      onClick: () => navigate("/Guarda/registro-correspondencia"),
    },
    {
      icon: "👤",
      title: "Registrar visitante",
      description: "Registrar ingreso de visitante",
      onClick: () => navigate("/Guarda/registro-visita"),
    },
    {
      icon: "📋",
      title: "Ver pendientes",
      description: "Revisar correspondencia pendiente",
      onClick: () => navigate("/Guarda/correspondencia-pendiente"),
    },
    {
      icon: "🔎",
      title: "Validar autorizado",
      description: "Verificar personas autorizadas",
      onClick: () => navigate("/Guarda/validar-autorizado"),
    },
  ];

  const formatTiempo = (fechaString: string) => {
    const fecha = new Date(fechaString);
    const ahora = new Date();
    const diffMs = ahora.getTime() - fecha.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Ahora mismo";
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;

    return fecha.toLocaleDateString("es-ES");
  };

  if (loading) {
    return (
      <div className="dashboard-guarda dashboard-guarda--loading">
        <div className="dg-container">
          <div className="dg-loading">
            <div className="dg-spinner">⏳</div>
            <p>Cargando datos en tiempo real...</p>
          </div>
        </div>

        <style>{`
          .dashboard-guarda {
            background: #f8fafc;
            min-height: calc(100vh - 0px);
            padding: 18px 0 30px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
              sans-serif;
          }

          .dashboard-guarda--loading {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .dg-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 12px;
          }

          .dg-loading {
            text-align: center;
            padding: 60px 20px;
          }

          .dg-spinner {
            font-size: 42px;
            margin-bottom: 10px;
            animation: dg-spin 2s linear infinite;
          }

          @keyframes dg-spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-guarda">
      <div className="dg-container">
        {/* Header */}
        <header className="dg-header">
          <div className="dg-title-block">
            <h1>🛡️ Panel del guarda</h1>
            <p>Control y gestión de seguridad en tiempo real.</p>
          </div>
          <div className="dg-welcome-pill">Buen trabajo, guarda 👊</div>
        </header>

        {/* Stats */}
        <section className="dg-stats-grid">
          {statsCards.map((stat, index) => (
            <button
              key={index}
              type="button"
              className="dg-stat-card"
              onClick={stat.onClick}
            >
              <div className="dg-stat-icon">{stat.icon}</div>
              <div className="dg-stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </button>
          ))}
        </section>

        {/* Acciones rápidas */}
        <section className="dg-section">
          <div className="dg-section-header">
            <h2>⚡ Acciones rápidas</h2>
          </div>
          <div className="dg-actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                type="button"
                className="dg-action-card"
                onClick={action.onClick}
              >
                <div className="dg-action-icon">{action.icon}</div>
                <div className="dg-action-content">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Actividad reciente */}
        <section className="dg-section">
          <div className="dg-section-header">
            <h2>📋 Actividad reciente</h2>
          </div>
          <div className="dg-activity-list">
            {actividadReciente.length === 0 ? (
              <div className="dg-empty-activity">
                <div className="dg-empty-icon">📊</div>
                <p>No hay actividad reciente registrada.</p>
              </div>
            ) : (
              actividadReciente.map((actividad) => (
                <div key={actividad.id} className="dg-activity-item">
                  <div className="dg-activity-icon">{actividad.icono}</div>
                  <div className="dg-activity-content">
                    <h4>{actividad.titulo}</h4>
                    <p>{actividad.descripcion}</p>
                  </div>
                  <span className="dg-activity-time">
                    {formatTiempo(actividad.fecha)}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <style>{`
        .dashboard-guarda {
          background: #f8fafc;
          min-height: calc(100vh - 0px);
          padding: 18px 0 30px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .dg-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 12px;
        }

        /* Header */
        .dg-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #ffffff;
          padding: 18px 20px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
          margin-bottom: 20px;
        }

        .dg-title-block h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          color: #1f2933;
        }

        .dg-title-block p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #64748b;
        }

        .dg-welcome-pill {
          padding: 6px 14px;
          border-radius: 999px;
          background: #22c55e;
          color: #ecfdf3;
          font-size: 13px;
          font-weight: 600;
        }

        /* Stats */
        .dg-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          margin-bottom: 22px;
        }

        .dg-stat-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 18px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
          cursor: pointer;
          transition:
            transform 0.1s ease,
            box-shadow 0.15s ease,
            border-color 0.15s;
        }

        .dg-stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(15, 23, 42, 0.1);
          border-color: #cbd5e1;
        }

        .dg-stat-icon {
          font-size: 32px;
          padding: 12px;
          border-radius: 12px;
          background: #eff6ff;
        }

        .dg-stat-content h3 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .dg-stat-content p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #6b7280;
        }

        /* Section */
        .dg-section {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 18px 18px 20px;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
          margin-bottom: 18px;
        }

        .dg-section-header h2 {
          margin: 0 0 14px;
          font-size: 18px;
          font-weight: 600;
          color: #1f2933;
        }

        /* Quick actions */
        .dg-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 12px;
        }

        .dg-action-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          background: #f9fafb;
          padding: 14px 14px;
          cursor: pointer;
          transition:
            border-color 0.15s ease,
            background 0.15s ease,
            box-shadow 0.15s ease,
            transform 0.1s ease;
        }

        .dg-action-card:hover {
          background: #ffffff;
          border-color: #4f46e5;
          box-shadow: 0 12px 26px rgba(79, 70, 229, 0.12);
          transform: translateY(-2px);
        }

        .dg-action-icon {
          font-size: 22px;
          margin-top: 2px;
        }

        .dg-action-content h4 {
          margin: 0 0 4px;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .dg-action-content p {
          margin: 0;
          font-size: 13px;
          color: #6b7280;
        }

        /* Activity */
        .dg-activity-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .dg-activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 12px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f9fafb;
          transition:
            background 0.15s ease,
            box-shadow 0.15s ease,
            transform 0.1s ease;
        }

        .dg-activity-item:hover {
          background: #ffffff;
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
          transform: translateX(2px);
        }

        .dg-activity-icon {
          font-size: 20px;
        }

        .dg-activity-content {
          flex: 1;
        }

        .dg-activity-content h4 {
          margin: 0 0 3px;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .dg-activity-content p {
          margin: 0;
          font-size: 13px;
          color: #6b7280;
        }

        .dg-activity-time {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }

        .dg-empty-activity {
          text-align: center;
          padding: 40px 10px;
          color: #6b7280;
          font-size: 14px;
        }

        .dg-empty-icon {
          font-size: 40px;
          margin-bottom: 8px;
          opacity: 0.5;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .dg-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .dg-stats-grid {
            grid-template-columns: 1fr;
          }

          .dg-actions-grid {
            grid-template-columns: 1fr;
          }

          .dg-activity-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .dg-activity-time {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardGuarda;
