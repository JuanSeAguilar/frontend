import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroCorrespondencia: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    torre: '',
    unidad: '',
    remitente: '',
    tipo: 'Paquete',
    observaciones: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.torre || !formData.unidad || !formData.remitente) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    // Simular registro exitoso
    alert(`✅ Correspondencia registrada para ${formData.torre} - ${formData.unidad}`);
    
    // Redirigir a la lista
    navigate('/guarda/correspondencia');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="registro-correspondencia">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="title-section">
            <h1>📝 Registro Rápido de Correspondencia</h1>
            <p>Formulario simplificado para guardas de seguridad</p>
          </div>
          <button 
            onClick={() => navigate('/guarda/correspondencia')}
            className="back-btn"
          >
            ← Volver
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="registro-form">
          <div className="form-grid">
            <div className="form-group">
              <label>🏢 Torre *</label>
              <input
                type="text"
                name="torre"
                value={formData.torre}
                onChange={handleChange}
                placeholder="Ej: Torre A"
                required
              />
            </div>

            <div className="form-group">
              <label>🚪 Unidad *</label>
              <input
                type="text"
                name="unidad"
                value={formData.unidad}
                onChange={handleChange}
                placeholder="Ej: 101, 205, etc."
                required
              />
            </div>

            <div className="form-group">
              <label>👤 Remitente *</label>
              <input
                type="text"
                name="remitente"
                value={formData.remitente}
                onChange={handleChange}
                placeholder="Ej: Servientrega, DHL, Familiar..."
                required
              />
            </div>

            <div className="form-group">
              <label>📦 Tipo de Correspondencia *</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <option value="Paquete">Paquete</option>
                <option value="Documento">Documento</option>
                <option value="Encomienda">Encomienda</option>
                <option value="Carta">Carta</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>📝 Observaciones</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              placeholder="Descripción del paquete, instrucciones especiales..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              📬 Registrar Correspondencia
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/guarda/correspondencia')}
              className="cancel-btn"
            >
              ❌ Cancelar
            </button>
          </div>
        </form>

        {/* Información de ayuda */}
        <div className="help-section">
          <h3>💡 Información para Guardas</h3>
          <div className="help-tips">
            <div className="tip">
              <strong>Verificar identificación:</strong> Siempre solicite identificación al remitente
            </div>
            <div className="tip">
              <strong>Descripción clara:</strong> Anote características visibles del paquete
            </div>
            <div className="tip">
              <strong>Notificación inmediata:</strong> Notifique al residente lo antes posible
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .registro-correspondencia {
          padding: 20px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          min-height: 100vh;
        }

        .container {
          max-width: 800px;
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

        .back-btn {
          background: #6b7280;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: #4b5563;
        }

        .registro-form {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
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

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #059669;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .submit-btn {
          flex: 2;
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
        }

        .cancel-btn {
          flex: 1;
          background: #6b7280;
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: #4b5563;
        }

        .help-section {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .help-section h3 {
          margin: 0 0 16px 0;
          color: #1e293b;
          font-size: 18px;
        }

        .help-tips {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tip {
          padding: 12px;
          background: #f0fdf4;
          border-radius: 8px;
          border-left: 4px solid #059669;
          font-size: 14px;
        }

        .tip strong {
          color: #065f46;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistroCorrespondencia;