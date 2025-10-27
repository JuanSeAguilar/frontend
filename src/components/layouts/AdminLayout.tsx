import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="layout-content">
        <Outlet />
      </main>
      
      <style>{`
        .admin-layout {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .layout-content {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

// ¡AGREGA ESTA LÍNEA!
export default AdminLayout;