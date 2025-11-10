import React, { useState, useEffect } from 'react';

interface PagoDemo {
  id: string;
  residente: string;
  unidad: string;
  monto: number;
  fecha: string;
  metodo: string;
  estado: 'completado' | 'pendiente' | 'fallido';
  comprobante?: string;
}

const DashboardPagosAdmin: React.FC = () => {
  const [pagos, setPagos] = useState<PagoDemo[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [cargando, setCargando] = useState(true);

  // Datos de demostración
  useEffect(() => {
    const datosDemo: PagoDemo[] = [
      {
        id: 'pago-001',
        residente: 'Carlos Rodríguez',
        unidad: 'Torre A - 101',
        monto: 150000,
        fecha: '2024-01-15',
        metodo: 'Transferencia',
        estado: 'completado',
        comprobante: 'comp-001.pdf'
      },
      {
        id: 'pago-002', 
        residente: 'María García',
        unidad: 'Torre B - 205',
        monto: 180000,
        fecha: '2024-01-14',
        metodo: 'Tarjeta',
        estado: 'completado'
      },
      {
        id: 'pago-003',
        residente: 'Juan Pérez',
        unidad: 'Torre A - 302',
        monto: 160000,
        fecha: '2024-01-16',
        metodo: 'Efectivo',
        estado: 'pendiente'
      },
      {
        id: 'pago-004',
        residente: 'Ana López',
        unidad: 'Torre C - 104',
        monto: 170000,
        fecha: '2024-01-13',
        metodo: 'Transferencia',
        estado: 'fallido'
      },
      {
        id: 'pago-005',
        residente: 'Pedro Martínez',
        unidad: 'Torre B - 401',
        monto: 155000,
        fecha: '2024-01-12',
        metodo: 'Tarjeta',
        estado: 'completado'
      }
    ];

    setTimeout(() => {
      setPagos(datosDemo);
      setCargando(false);
    }, 1000);
  }, []);

  const pagosFiltrados = filtroEstado === 'todos' 
    ? pagos 
    : pagos.filter(pago => pago.estado === filtroEstado);

  const totalRecaudado = pagos
    .filter(p => p.estado === 'completado')
    .reduce((sum, pago) => sum + pago.monto, 0);

  const estadisticas = {
    completados: pagos.filter(p => p.estado === 'completado').length,
    pendientes: pagos.filter(p => p.estado === 'pendiente').length,
    fallidos: pagos.filter(p => p.estado === 'fallido').length,
    total: pagos.length
  };

  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'completado': return '#10b981';
      case 'pendiente': return '#f59e0b';
      case 'fallido': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (cargando) {
    return (
      <div className="pagos-admin-container">
        <div className="loading">Cargando reporte de pagos...</div>
      </div>
    );
  }

  return (
    <div className="pagos-admin-container">
      <div className="admin-header">
        <h1>📊 Reporte de Pagos</h1>
        <p>Gestión y visualización de transacciones</p>
      </div>

      {/* Estadísticas */}
      <div className="estadisticas-grid">
        <div className="estadistica-card">
          <div className="estadistica-icon">💰</div>
          <div className="estadistica-info">
            <h3>${totalRecaudado.toLocaleString()}</h3>
            <p>Total Recaudado</p>
          </div>
        </div>
        
        <div className="estadistica-card">
          <div className="estadistica-icon">✅</div>
          <div className="estadistica-info">
            <h3>{estadisticas.completados}</h3>
            <p>Completados</p>
          </div>
        </div>
        
        <div className="estadistica-card">
          <div className="estadistica-icon">⏳</div>
          <div className="estadistica-info">
            <h3>{estadisticas.pendientes}</h3>
            <p>Pendientes</p>
          </div>
        </div>
        
        <div className="estadistica-card">
          <div className="estadistica-icon">❌</div>
          <div className="estadistica-info">
            <h3>{estadisticas.fallidos}</h3>
            <p>Fallidos</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros-section">
        <div className="filtro-group">
          <label>Filtrar por estado:</label>
          <select 
            value={filtroEstado} 
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos los estados</option>
            <option value="completado">Completados</option>
            <option value="pendiente">Pendientes</option>
            <option value="fallido">Fallidos</option>
          </select>
        </div>
        
        <div className="contador">
          Mostrando {pagosFiltrados.length} de {pagos.length} pagos
        </div>
      </div>

      {/* Tabla de pagos */}
      <div className="pagos-table-container">
        <table className="pagos-table">
          <thead>
            <tr>
              <th>Residente</th>
              <th>Unidad</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Método</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagosFiltrados.map(pago => (
              <tr key={pago.id}>
                <td className="residente-cell">
                  <div className="avatar">👤</div>
                  {pago.residente}
                </td>
                <td>{pago.unidad}</td>
                <td className="monto-cell">${pago.monto.toLocaleString()}</td>
                <td>{new Date(pago.fecha).toLocaleDateString()}</td>
                <td>
                  <span className={`metodo-badge metodo-${pago.metodo.toLowerCase()}`}>
                    {pago.metodo}
                  </span>
                </td>
                <td>
                  <span 
                    className="estado-badge"
                    style={{ backgroundColor: getColorEstado(pago.estado) }}
                  >
                    {pago.estado}
                  </span>
                </td>
                <td>
                  <div className="acciones-cell">
                    <button className="btn-ver">👁️ Ver</button>
                    {pago.comprobante && (
                      <button className="btn-descargar">📥 PDF</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {pagosFiltrados.length === 0 && (
          <div className="sin-resultados">
            No hay pagos que coincidan con el filtro
          </div>
        )}
      </div>

      <style>{`
        .pagos-admin-container {
          padding: 24px;
          background: #f8fafc;
          min-height: 100vh;
        }
        
        .admin-header {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 24px;
        }
        
        .admin-header h1 {
          margin: 0 0 8px 0;
          color: #1e293b;
        }
        
        .admin-header p {
          margin: 0;
          color: #64748b;
        }
        
        .estadisticas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .estadistica-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .estadistica-icon {
          font-size: 2rem;
        }
        
        .estadistica-info h3 {
          margin: 0 0 4px 0;
          color: #1e293b;
          font-size: 1.5rem;
        }
        
        .estadistica-info p {
          margin: 0;
          color: #64748b;
          font-size: 0.9rem;
        }
        
        .filtros-section {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 24px;
          display: flex;
          justify-content: between;
          align-items: center;
          gap: 24px;
        }
        
        .filtro-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .filtro-group label {
          font-weight: 600;
          color: #374151;
        }
        
        .filtro-select {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: white;
        }
        
        .contador {
          color: #6b7280;
          font-size: 0.9rem;
        }
        
        .pagos-table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .pagos-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .pagos-table th {
          background: #f8fafc;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .pagos-table td {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .residente-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e0f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }
        
        .monto-cell {
          font-weight: 600;
          color: #059669;
        }
        
        .metodo-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .metodo-transferencia { background: #dbeafe; color: #1e40af; }
        .metodo-tarjeta { background: #f3e8ff; color: #7e22ce; }
        .metodo-efectivo { background: #dcfce7; color: #166534; }
        
        .estado-badge {
          padding: 6px 12px;
          border-radius: 20px;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: capitalize;
        }
        
        .acciones-cell {
          display: flex;
          gap: 8px;
        }
        
        .btn-ver, .btn-descargar {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        
        .btn-ver {
          background: #3b82f6;
          color: white;
        }
        
        .btn-descargar {
          background: #10b981;
          color: white;
        }
        
        .btn-ver:hover { background: #2563eb; }
        .btn-descargar:hover { background: #059669; }
        
        .sin-resultados {
          padding: 40px;
          text-align: center;
          color: #6b7280;
          font-style: italic;
        }
        
        .loading {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default DashboardPagosAdmin;