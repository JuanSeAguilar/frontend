import React from 'react';

const Residentes: React.FC = () => {
  return (
    <div className="residentes-container">
      <div className="page-header">
        <h1>👥 Gestión de Residentes</h1>
        <p>Administra los residentes del conjunto residencial</p>
      </div>
      
      <div className="content">
        <div className="placeholder-card">
          <h3>🚧 En construcción</h3>
          <p>Esta sección estará disponible pronto</p>
        </div>
      </div>

      <style>{`
        .residentes-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
        }

        .page-header {
          margin-bottom: 32px;
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .page-header h1 {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg, #1e40af, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 8px 0;
        }

        .page-header p {
          color: #64748b;
          margin: 0;
          font-size: 16px;
        }

        .placeholder-card {
          background: white;
          border-radius: 16px;
          padding: 60px 40px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }

        .placeholder-card h3 {
          font-size: 24px;
          color: #1e293b;
          margin: 0 0 16px 0;
        }

        .placeholder-card p {
          color: #64748b;
          margin: 0;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

// ¡AGREGA ESTA LÍNEA!
export default Residentes;