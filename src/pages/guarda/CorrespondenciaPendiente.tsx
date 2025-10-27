import React from 'react';
import { useNavigate } from 'react-router-dom';

const CorrespondenciaPendiente: React.FC = () => {
  const navigate = useNavigate();

  // Datos mock de correspondencia pendiente
  const correspondenciasPendientes = [
    {
      id: '1',
      torre: 'Torre A',
      unidad: '101',
      remitente: 'Servientrega',
      tipo: 'Paquete',
      fecha: '2024-01-15',
      observaciones: 'Paquete mediano, frágil'
    },
    {
      id: '2',
      torre: 'Torre B', 
      unidad: '205',
      remitente: 'DHL',
      tipo: 'Documento',
      fecha: '2024-01-15',
      observaciones: 'Sobre manila'
    },
    {
      id: '3',
      torre: 'Torre C',
      unidad: '302',
      remitente: 'Familiar',
      tipo: 'Encomienda',
      fecha: '2024-01-14',
      observaciones: 'Caja de alimentos'
    }
  ];

  const handleNotificar = (id: string) => {
    alert(`📢 Notificando correspondencia ${id} al residente`);
    // Aquí iría la lógica real de notificación
  };

  return (
    <div className="correspondencia-pendiente">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="title-section">
            <h1>📬 Correspondencia Pendiente</h1>
            <p>Gestión de correspondencia por entregar</p>
          </div>
          <button 
            onClick={() => navigate('/guarda/correspondencia/registrar')}
            className="nuevo-btn"
          >
            + Nueva Correspondencia
          </button>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>{correspondenciasPendientes.length}</h3>
              <p>Pendientes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>5</h3>
              <p>Entregadas Hoy</p>
            </div>
          </div>
        </div>

        {/* Lista de correspondencia */}
        <div className="correspondencia-list">
          <h2>📋 Correspondencia por Notificar</h2>
          
          {correspondenciasPendientes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <h3>No hay correspondencia pendiente</h3>
              <p>Toda la correspondencia ha sido notificada</p>
            </div>
          ) : (
            <div className="correspondencia-grid">
              {correspondenciasPendientes.map((item) => (
                <div key={item.id} className="correspondencia-card">
                  <div className="card-header">
                    <h3>🏢 {item.torre} - {item.unidad}</h3>
                    <span className="badge pendiente">Pendiente</span>
                  </div>
                  
                  <div className="card-content">
                    <div className="info-row">
                      <span className="label">📦 Tipo:</span>
                      <span className="value">{item.tipo}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">👤 Remitente:</span>
                      <span className="value">{item.remitente}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">📅 Fecha:</span>
                      <span className="value">{item.fecha}</span>
                    </div>
                    {item.observaciones && (
                      <div className="info-row">
                        <span className="label">📝 Observaciones:</span>
                        <span className="value">{item.observaciones}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-actions">
                    <button 
                      onClick={() => handleNotificar(item.id)}
                      className="btn notificar"
                    >
                      📢 Notificar Residente
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .correspondencia-pendiente {
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
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
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

        .nuevo-btn {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nuevo-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          font-size: 32px;
          background: #f0fdf4;
          padding: 12px;
          border-radius: 10px;
        }

        .stat-content h3 {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 4px 0;
          color: #1e293b;
        }

        .stat-content p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .correspondencia-list {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .correspondencia-list h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 20px 0;
        }

        .correspondencia-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
        }

        .correspondencia-card {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .correspondencia-card:hover {
          border-color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .card-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge.pendiente {
          background: #fef3c7;
          color: #d97706;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          padding: 4px 0;
        }

        .label {
          font-weight: 600;
          color: #64748b;
          font-size: 14px;
        }

        .value {
          color: #1e293b;
          font-size: 14px;
          text-align: right;
        }

        .card-actions {
          margin-top: 16px;
          display: flex;
          gap: 8px;
        }

        .btn {
          flex: 1;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .btn.notificar {
          background: #3b82f6;
          color: white;
        }

        .btn.notificar:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          color: #1e293b;
          margin: 0 0 8px 0;
        }

        .empty-state p {
          color: #64748b;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default CorrespondenciaPendiente;