import React from 'react';
import { Outlet } from 'react-router-dom';
import ResidenteNavbar from '../ResidenteNavbar';

const ResidenteLayout: React.FC = () => {
  return (
    <div className="residente-layout">
      <ResidenteNavbar />
      <main className="layout-content">
        <Outlet />
      </main>

      <style>{`
        .residente-layout {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
        }
        .layout-content {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default ResidenteLayout;
