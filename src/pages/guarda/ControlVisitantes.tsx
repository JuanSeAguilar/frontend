import React, { useState } from 'react';

interface Visitante {
  id: string;
  nombre: string;
  documento: string;
  unidad: string;
  motivo: string;
  horaEntrada: string;
  horaSalida?: string;
}

const ControlVisitantes: React.FC = () => {
  const [visitantes, setVisitantes] = useState<Visitante[]>([
    {
      id: '1',
      nombre: 'María González',
      documento: '12345678',
      unidad: 'Torre A - 101',
      motivo: 'Visita familiar',
      horaEntrada: '14:30'
    },
    {
      id: '2', 
      nombre: 'Carlos Rodríguez',
      documento: '87654321',
      unidad: 'Torre B - 205',
      motivo: 'Entrega paquete',
      horaEntrada: '15:15'
    }
  ]);

  const [nuevoVisitante, setNuevoVisitante] = useState({
    nombre: '',
    documento: '',
    unidad: '',
    motivo: ''
  });

  const registrarEntrada = () => {
    if (!nuevoVisitante.nombre || !nuevoVisitante.documento || !nuevoVisitante.unidad) {
      alert('Por favor complete todos los campos');
      return;
    }

    const visitante: Visitante = {
      id: Date.now().toString(),
      ...nuevoVisitante,
      horaEntrada: new Date().toLocaleTimeString('es-CO', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setVisitantes([visitante, ...visitantes]);
    setNuevoVisitante({ nombre: '', documento: '', unidad: '', motivo: '' });
    alert('Visitante registrado exitosamente');
  };

  const registrarSalida = (id: string) => {
    setVisitantes(visitantes.map(v => 
      v.id === id 
        ? { ...v, horaSalida: new Date().toLocaleTimeString('es-CO', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }) }
        : v
    ));
  };

  return (
    <div className="control-visitantes">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="title-section">
            <h1>👤 Control de Visitantes</h1>
            <p>Registro y control de ingresos al conjunto</p>
          </div>
        </div>

        {/* Formulario de registro */}
        <div className="form-section">
          <h2>📝 Registrar Nuevo Visitante</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Nombre completo *</label>
              <input
                type="text"
                value={nuevoVisitante.nombre}
                onChange={(e) => setNuevoVisitante({...nuevoVisitante, nombre: e.target.value})}
                placeholder="Ej: María González"
              />
            </div>
            
            <div className="form-group">
              <label>Documento de identidad *</label>
              <input
                type="text"
                value={nuevoVisitante.documento}
                onChange={(e) => setNuevoVisitante({...nuevoVisitante, documento: e.target.value})}
                placeholder="Ej: 12345678"
              />
            </div>
            
            <div className="form-group">
              <label>Unidad a visitar *</label>
              <input
                type="text"
                value={nuevoVisitante.unidad}
                onChange={(e) => setNuevoVisitante({...nuevoVisitante, unidad: e.target.value})}
                placeholder="Ej: Torre A - 101"
              />
            </div>
            
            <div className="form-group">
              <label>Motivo de la visita</label>
              <input
                type="text"
                value={nuevoVisitante.motivo}
                onChange={(e) => setNuevoVisitante({...nuevoVisitante, motivo: e.target.value})}
                placeholder="Ej: Visita familiar, entrega, etc."
              />
            </div>
          </div>
          
          <button onClick={registrarEntrada} className="submit-btn">
            🕒 Registrar Entrada
          </button>
        </div>

        {/* Lista de visitantes */}
        <div className="list-section">
          <h2>📋 Visitantes en Conjunto</h2>
          <div className="visitantes-grid">
            {visitantes.filter(v => !v.horaSalida).map(visitante => (
              <div key={visitante.id} className="visitante-card">
                <div className="visitante-info">
                  <h3>{visitante.nombre}</h3>
                  <p><strong>Documento:</strong> {visitante.documento}</p>
                  <p><strong>Unidad:</strong> {visitante.unidad}</p>
                  <p><strong>Motivo:</strong> {visitante.motivo}</p>
                  <p><strong>Hora entrada:</strong> {visitante.horaEntrada}</p>
                </div>
                <button 
                  onClick={() => registrarSalida(visitante.id)}
                  className="salida-btn"
                >
                  🚪 Registrar Salida
                </button>
              </div>
            ))}
          </div>

          {visitantes.filter(v => !v.horaSalida).length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <h3>No hay visitantes en el conjunto</h3>
              <p>Todos los visitantes han registrado su salida</p>
            </div>
          )}
        </div>

        {/* Historial */}
        <div className="historial-section">
          <h2>📜 Historial del Día</h2>
          <div className="historial-table">
            <div className="table-header">
              <span>Nombre</span>
              <span>Unidad</span>
              <span>Entrada</span>
              <span>Salida</span>
            </div>
            {visitantes.map(visitante => (
              <div key={visitante.id} className="table-row">
                <span>{visitante.nombre}</span>
                <span>{visitante.unidad}</span>
                <span>{visitante.horaEntrada}</span>
                <span>{visitante.horaSalida || 'En conjunto'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .control-visitantes {
          padding: 20px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
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

        .form-section {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .form-section h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 20px 0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .form-group input {
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #059669;
        }

        .submit-btn {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
        }

        .list-section, .historial-section {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .list-section h2, .historial-section h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 20px 0;
        }

        .visitantes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
        }

        .visitante-card {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .visitante-info h3 {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .visitante-info p {
          margin: 4px 0;
          font-size: 14px;
          color: #64748b;
        }

        .salida-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.3s ease;
        }

        .salida-btn:hover {
          background: #dc2626;
          transform: translateY(-1px);
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
        }

        .empty-icon {
          font-size: 48px;
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

        .historial-table {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1fr;
          background: #f8fafc;
          padding: 12px 16px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1fr;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 14px;
        }

        .table-row:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default ControlVisitantes;