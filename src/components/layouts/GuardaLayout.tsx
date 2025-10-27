import React from 'react';
import { Outlet } from 'react-router-dom';
import GuardaNavbar from '../GuardaNavbar';

const GuardaLayout: React.FC = () => {
  return (
    <div className="guarda-layout">
      <GuardaNavbar />
      <main className="layout-content">
        <Outlet />
      </main>
      
      <style>{`
        .guarda-layout {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }
        
        .layout-content {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

// ¡AGREGA ESTA LÍNEA!
export default GuardaLayout;