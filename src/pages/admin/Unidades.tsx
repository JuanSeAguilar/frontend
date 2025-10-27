import React, { useState } from 'react';

interface Unidad {
  id: string;
  torre: string;
  numero: string;
  residente: string;
  telefono: string;
  email: string;
  estado: 'Ocupado' | 'Desocupado' | 'Mantenimiento';
}

const Unidades: React.FC = () => {
  const [unidades, setUnidades] = useState<Unidad[]>([
    {
      id: '1',
      torre: 'Torre A',
      numero: '101',
      residente: 'Carlos Rodríguez',
      telefono: '3001234567',
      email: 'carlos@email.com',
      estado: 'Ocupado'
    },
    {
      id: '2',
      torre: 'Torre A',
      numero: '102',
      residente: 'María González',
      telefono: '3007654321',
      email: 'maria@email.com',
      estado: 'Ocupado'
    },
    {
      id: '3',
      torre: 'Torre B',
      numero: '201',
      residente: '',
      telefono: '',
      email: '',
      estado: 'Desocupado'
    },
    {
      id: '4',
      torre: 'Torre C',
      numero: '301',
      residente: 'Ana Martínez',
      telefono: '3005558888',
      email: 'ana@email.com',
      estado: 'Mantenimiento'
    }
  ]);

  const [filtroTorre, setFiltroTorre] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const torres = ['Torre A', 'Torre B', 'Torre C', 'Torre D'];
  const estados = ['Ocupado', 'Desocupado', 'Mantenimiento'];

  const unidadesFiltradas = unidades.filter(unidad => {
    return (
      (filtroTorre === '' || unidad.torre === filtroTorre) &&
      (filtroEstado === '' || unidad.estado === filtroEstado)
    );
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Ocupado': return '#10b981';
      case 'Desocupado': return '#6b7280';
      case 'Mantenimiento': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="unidades-page">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="title-section">
            <h1>🏘️ Gestión de Unidades</h1>
            <p>Administra las torres y apartamentos del conjunto</p>
          </div>
          <button className="nuevo-btn">
            + Nueva Unidad
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <h3>4</h3>
              <p>Torres</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚪</div>
            <div className="stat-content">
              <h3>60</h3>
              <p>Unidades Totales</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>45</h3>
              <p>Ocupadas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <h3>3</h3>
              <p>En Mantenimiento</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-section">
          <h3>🔍 Filtros</h3>
          <div className="filtros-grid">
            <div className="filtro-group">
              <label>Torre:</label>
              <select 
                value={filtroTorre} 
                onChange={(e) => setFiltroTorre(e.target.value)}
              >
                <option value="">Todas las torres</option>
                {torres.map(torre => (
                  <option key={torre} value={torre}>{torre}</option>
                ))}
              </select>
            </div>
            
            <div className="filtro-group">
              <label>Estado:</label>
              <select 
                value={filtroEstado} 
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Unidades */}
        <div className="unidades-section">
          <div className="section-header">
            <h2>📋 Lista de Unidades ({unidadesFiltradas.length})</h2>
            <div className="resultados-info">
              Mostrando {unidadesFiltradas.length} de {unidades.length} unidades
            </div>
          </div>

          <div className="unidades-grid">
            {unidadesFiltradas.map(unidad => (
              <div key={unidad.id} className="unidad-card">
                <div className="card-header">
                  <h3>🏢 {unidad.torre} - {unidad.numero}</h3>
                  <span 
                    className="estado-badge"
                    style={{ backgroundColor: getEstadoColor(unidad.estado) }}
                  >
                    {unidad.estado}
                  </span>
                </div>

                <div className="card-content">
                  {unidad.residente ? (
                    <>
                      <div className="info-row">
                        <span className="label">👤 Residente:</span>
                        <span className="value">{unidad.residente}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">📞 Teléfono:</span>
                        <span className="value">{unidad.telefono}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">📧 Email:</span>
                        <span className="value">{unidad.email}</span>
                      </div>
                    </>
                  ) : (
                    <div className="empty-resident">
                      <span>🏠 Unidad disponible</span>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button className="btn edit-btn">
                    ✏️ Editar
                  </button>
                  <button className="btn details-btn">
                    📊 Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

          {unidadesFiltradas.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🏢</div>
              <h3>No se encontraron unidades</h3>
              <p>Intenta con otros filtros de búsqueda</p>
            </div>
          )}
        </div>

        {/* Resumen por Torre */}
        <div className="resumen-section">
          <h2>📊 Resumen por Torre</h2>
          <div className="resumen-grid">
            {torres.map(torre => {
              const torreUnidades = unidades.filter(u => u.torre === torre);
              const ocupadas = torreUnidades.filter(u => u.estado === 'Ocupado').length;
              
              return (
                <div key={torre} className="resumen-card">
                  <h3>{torre}</h3>
                  <div className="resumen-stats">
                    <div className="stat">
                      <span className="number">{torreUnidades.length}</span>
                      <span className="label">Total</span>
                    </div>
                    <div className="stat">
                      <span className="number">{ocupadas}</span>
                      <span className="label">Ocupadas</span>
                    </div>
                    <div className="stat">
                      <span className="number">{torreUnidades.length - ocupadas}</span>
                      <span className="label">Disponibles</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .unidades-page {
          padding: 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
        }

        .container {
          max-width: 1400px;
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
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg, #1e40af, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 8px 0;
        }

        .title-section p {
          color: #64748b;
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

        .stats-grid {
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
          background: #f1f5f9;
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

        .filtros-section {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .filtros-section h3 {
          margin: 0 0 16px 0;
          color: #1e293b;
        }

        .filtros-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .filtro-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filtro-group label {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .filtro-group select {
          padding: 10px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
        }

        .unidades-section, .resumen-section {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .resultados-info {
          color: #64748b;
          font-size: 14px;
        }

        .unidades-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .unidad-card {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .unidad-card:hover {
          border-color: #3b82f6;
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

        .estado-badge {
          padding: 4px 12px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 600;
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

        .empty-resident {
          text-align: center;
          padding: 20px;
          background: #f8fafc;
          border-radius: 8px;
          color: #64748b;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        .btn {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 12px;
        }

        .edit-btn {
          background: #3b82f6;
          color: white;
        }

        .edit-btn:hover {
          background: #2563eb;
        }

        .details-btn {
          background: #f1f5f9;
          color: #374151;
        }

        .details-btn:hover {
          background: #e2e8f0;
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

        .resumen-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .resumen-card {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }

        .resumen-card h3 {
          margin: 0 0 16px 0;
          color: #1e293b;
          font-size: 18px;
        }

        .resumen-stats {
          display: flex;
          justify-content: space-around;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat .number {
          font-size: 24px;
          font-weight: bold;
          color: #1e293b;
        }

        .stat .label {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

export default Unidades;