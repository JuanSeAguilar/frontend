import React from 'react';
import { useNavigate } from 'react-router-dom';
import PagoForm from '../components/PagoForm';

const PagoPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePagoExitoso = () => {
    navigate('/residente', { 
      state: { mensaje: '¡Pago realizado exitosamente! 🎉' } 
    });
  };

  const handleCancelar = () => {
    navigate('/residente');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc, #e0f2fe)',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <PagoForm
        monto={150000}
        concepto="Administración"
        periodo="2025-01"
        onPagoExitoso={handlePagoExitoso}
        onCancelar={handleCancelar}
      />
    </div>
  );
};

export default PagoPage;