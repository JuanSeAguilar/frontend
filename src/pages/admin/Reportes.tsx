import React, { useState } from 'react';

const Reportes: React.FC = () => {
  const [tipoReporte, setTipoReporte] = useState<'correspondencia' | 'visitantes' | 'unidades'>('correspondencia');
  const [rangoFecha, setRangoFecha] = useState<'hoy' | 'semana' | 'mes' | 'custom'>('semana');

  return (
    <div className="reportes-page">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="title-section">
            <h1>📈 Reportes y Estadísticas</h1>
            <p>Análisis y métricas del conjunto residencial</p>
          </div>
          <div className="header-actions">
            <button className="export-btn">
              📊 Exportar Reporte
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-section">
          <div className="filtros-grid">
            <div className="filtro-group">
              <label>Tipo de Reporte:</label>
              <select 
                value={tipoReporte} 
                onChange={(e) => setTipoReporte(e.target.value as any)}
              >
                <option value="correspondencia">📬 Correspondencia</option>
                <option value="visitantes">👤 Visitantes</option>
                <option value="unidades">🏘️ Unidades</option>
              </select>
            </div>
            
            <div className="filtro-group">
              <label>Rango de Fechas:</label>
              <select 
                value={rangoFecha} 
                onChange={(e) => setRangoFecha(e.target.value as any)}
              >
                <option value="hoy">Hoy</option>
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mes</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card primary">
            <div className="stat-icon">📬</div>
            <div className="stat-content">
              <h3>156</h3>
              <p>Total Correspondencia</p>
              <span className="trend positive">+12% vs mes anterior</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-content">
              <h3>324</h3>
              <p>Visitantes Registrados</p>
              <span className="trend positive">+8% vs mes anterior</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🏘️</div>
            <div className="stat-content">
              <h3>75%</h3>
              <p>Ocupación Total</p>
              <span className="trend neutral">+2% vs mes anterior</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3>15 min</h3>
              <p>Tiempo Promedio Entrega</p>
              <span className="trend negative">-5% vs mes anterior</span>
            </div>
          </div>
        </div>

        {/* Gráfico Principal */}
        <div className="chart-section">
          <h2>
            {tipoReporte === 'correspondencia' && '📬 Correspondencia por Día'}
            {tipoReporte === 'visitantes' && '👤 Visitantes por Torre'}
            {tipoReporte === 'unidades' && '🏘️ Estado de Unidades'}
          </h2>
          <div className="chart-container">
            <div className="chart-placeholder">
              <div className="chart-message">
                <div className="chart-icon">📊</div>
                <h3>Visualización de Datos</h3>
                <p>Los gráficos se cargarían aquí con datos reales</p>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas Adicionales */}
        <div className="metrics-grid">
          <div className="metric-card">
            <h4>🏆 Torre Más Activa</h4>
            <div className="metric-value">Torre A</div>
            <div className="metric-desc">45 correspondencias este mes</div>
          </div>
          
          <div className="metric-card">
            <h4>⚡ Tiempo Respuesta</h4>
            <div className="metric-value">18 min</div>
            <div className="metric-desc">Promedio notificación→entrega</div>
          </div>
          
          <div className="metric-card">
            <h4>📅 Hora Pico</h4>
            <div className="metric-value">2:00 PM - 4:00 PM</div>
            <div className="metric-desc">Mayor flujo de correspondencia</div>
          </div>
          
          <div className="metric-card">
            <h4>👤 Visitante Frecuente</h4>
            <div className="metric-value">Servientrega</div>
            <div className="metric-desc">12 visitas este mes</div>
          </div>
        </div>

        {/* Tabla de Datos */}
        <div className="tabla-section">
          <h2>📋 Resumen de Actividad</h2>
          <div className="tabla-container">
            <div className="tabla-header">
              <span>Fecha</span>
              <span>Torre</span>
              <span>Correspondencia</span>
              <span>Visitantes</span>
            </div>
            
            {[1, 2, 3, 4, 5].map(item => (
              <div key={item} className="tabla-fila">
                <span>2024-01-{10 + item}</span>
                <span>Torre {String.fromCharCode(64 + item)}</span>
                <span>{12 - item}</span>
                <span>{8 - item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .reportes-page {
          padding: 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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

        .export-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .filtros-section {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .filtros-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

        .stats-overview {
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

        .stat-card.primary {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
        }

        .stat-card.primary .stat-content h3,
        .stat-card.primary .stat-content p {
          color: white;
        }

        .stat-icon {
          font-size: 32px;
          background: rgba(255, 255, 255, 0.2);
          padding: 12px;
          border-radius: 10px;
        }

        .stat-card:not(.primary) .stat-icon {
          background: #f1f5f9;
        }

        .stat-content h3 {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 4px 0;
        }

        .stat-content p {
          margin: 0 0 4px 0;
          font-size: 14px;
        }

        .trend {
          font-size: 12px;
          font-weight: 600;
        }

        .trend.positive {
          color: #10b981;
        }

        .stat-card.primary .trend.positive {
          color: #a7f3d0;
        }

        .trend.negative {
          color: #ef4444;
        }

        .stat-card.primary .trend.negative {
          color: #fca5a5;
        }

        .trend.neutral {
          color: #6b7280;
        }

        .chart-section {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .chart-section h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 20px 0;
        }

        .chart-container {
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #e2e8f0;
          border-radius: 12px;
        }

        .chart-message {
          text-align: center;
          color: #64748b;
        }

        .chart-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .chart-message h3 {
          margin: 0 0 8px 0;
          color: #374151;
        }

        .chart-message p {
          margin: 0;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .metric-card h4 {
          margin: 0 0 12px 0;
          font-size: 16px;
          font-weight: 600;
          color: #374151;
        }

        .metric-value {
          font-size: 24px;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 8px;
        }

        .metric-desc {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .tabla-section {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .tabla-section h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 20px 0;
        }

        .tabla-container {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .tabla-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          background: #f8fafc;
          padding: 12px 16px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .tabla-fila {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 14px;
        }

        .tabla-fila:last-child {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .stats-overview {
            grid-template-columns: 1fr;
          }
          
          .tabla-header,
          .tabla-fila {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Reportes;