import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Datos mock
const mockCorrespondencias = [
  {
    idCorrespondencia: '1',
    torreNombre: 'Torre A',
    unidadCodigo: '101',
    tipoCorrespondencia: 'Paquete',
    remitente: 'Servientrega',
    observacion: 'Paquete mediano, frágil',
    fechaRecepcion: '2024-01-15T10:00:00Z',
    usuarioRegistro: 'Admin',
    estado: 'Pendiente'
  },
  {
    idCorrespondencia: '2',
    torreNombre: 'Torre B',
    unidadCodigo: '205',
    tipoCorrespondencia: 'Documento',
    remitente: 'DHL',
    observacion: 'Sobre manila',
    fechaRecepcion: '2024-01-15T11:30:00Z',
    usuarioRegistro: 'Admin',
    estado: 'Notificado'
  }
];

const CorrespondenciaList: React.FC = () => {
  const navigate = useNavigate();
  const [correspondencias, setCorrespondencias] = useState(mockCorrespondencias);
  const [loading, setLoading] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [filtroEstado]);

  const correspondenciasFiltradas = filtroEstado 
    ? correspondencias.filter(c => c.estado === filtroEstado)
    : correspondencias;

  const handleNotificar = async (id: string) => {
    if (window.confirm('¿Notificar al residente?')) {
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Residente notificado exitosamente');
      setCorrespondencias(correspondencias.map(c => 
        c.idCorrespondencia === id ? { ...c, estado: 'Notificado' } : c
      ));
    }
  };

  const handleEntregar = async (id: string) => {
    const entregadoA = prompt('¿Nombre de quien retira?');
    if (entregadoA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Correspondencia marcada como entregada');
      setCorrespondencias(correspondencias.map(c => 
        c.idCorrespondencia === id ? { ...c, estado: 'Entregado' } : c
      ));
    }
  };

  const handleEliminar = async (id: string) => {
    if (window.confirm('¿Eliminar esta correspondencia?')) {
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Correspondencia eliminada');
      setCorrespondencias(correspondencias.filter(c => c.idCorrespondencia !== id));
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pendiente': return '#f59e0b';
      case 'Notificado': return '#3b82f6';
      case 'Entregado': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando correspondencias...</p>
    </div>
  );

  return (
    <div className="correspondencia-list">
      {/* Header */}
      <div className="header">
        <h1>📬 Gestión de Correspondencia</h1>
        <button 
          className="nuevo-btn"
          onClick={() => navigate('/admin/correspondencia/nueva')}
        >
          + Nueva Correspondencia
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <select 
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Notificado">Notificado</option>
          <option value="Entregado">Entregado</option>
        </select>
      </div>

      {/* Lista */}
      <div className="lista-container">
        {correspondenciasFiltradas.length === 0 ? (
          <div className="empty-state">
            <p>No hay correspondencia registrada</p>
            <button 
              onClick={() => navigate('/admin/correspondencia/nueva')}
              className="nuevo-btn"
            >
              Registrar primera correspondencia
            </button>
          </div>
        ) : (
          correspondenciasFiltradas.map((corresp) => (
            <div key={corresp.idCorrespondencia} className="correspondencia-card">
              <div className="card-content">
                <h3>🏢 {corresp.torreNombre} - {corresp.unidadCodigo}</h3>
                <div className="info-grid">
                  <p><strong>📦 Tipo:</strong> {corresp.tipoCorrespondencia}</p>
                  <p><strong>👤 Remitente:</strong> {corresp.remitente}</p>
                  <p><strong>📅 Fecha:</strong> {new Date(corresp.fechaRecepcion).toLocaleDateString()}</p>
                  <p><strong>👥 Registrado por:</strong> {corresp.usuarioRegistro}</p>
                </div>
                {corresp.observacion && (
                  <p className="observaciones"><strong>📝 Observaciones:</strong> {corresp.observacion}</p>
                )}
                <div className="estado-container">
                  <strong>Estado:</strong>
                  <span 
                    className="estado-badge"
                    style={{ backgroundColor: getEstadoColor(corresp.estado) }}
                  >
                    {corresp.estado}
                  </span>
                </div>
              </div>
              
              <div className="acciones">
                {corresp.estado === 'Pendiente' && (
                  <button 
                    onClick={() => handleNotificar(corresp.idCorrespondencia)}
                    className="btn btn-notificar"
                  >
                    📢 Notificar
                  </button>
                )}
                
                {corresp.estado === 'Notificado' && (
                  <button 
                    onClick={() => handleEntregar(corresp.idCorrespondencia)}
                    className="btn btn-entregar"
                  >
                    ✅ Entregar
                  </button>
                )}

                <button 
                  onClick={() => handleEliminar(corresp.idCorrespondencia)}
                  className="btn btn-eliminar"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .correspondencia-list {
          padding: 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

        .header h1 {
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(135deg, #1e40af, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .nuevo-btn {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
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
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .filtros {
          margin-bottom: 24px;
        }

        .filtro-select {
          border: 2px solid #e2e8f0;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          background: white;
        }

        .lista-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .correspondencia-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .card-content {
          flex: 1;
        }

        .card-content h3 {
          font-size: 18px;
          font-weight: bold;
          color: #1e293b;
          margin: 0 0 16px 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 12px;
        }

        .info-grid p {
          margin: 4px 0;
          font-size: 14px;
        }

        .observaciones {
          margin: 12px 0;
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
          font-size: 14px;
        }

        .estado-container {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
        }

        .estado-badge {
          padding: 4px 12px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 600;
        }

        .acciones {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 120px;
        }

        .btn {
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 12px;
        }

        .btn-notificar {
          background: #3b82f6;
          color: white;
        }

        .btn-notificar:hover {
          background: #2563eb;
        }

        .btn-entregar {
          background: #10b981;
          color: white;
        }

        .btn-entregar:hover {
          background: #059669;
        }

        .btn-eliminar {
          background: #ef4444;
          color: white;
        }

        .btn-eliminar:hover {
          background: #dc2626;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .empty-state p {
          color: #64748b;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          gap: 16px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .correspondencia-card {
            flex-direction: column;
          }
          
          .acciones {
            flex-direction: row;
            width: 100%;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CorrespondenciaList;