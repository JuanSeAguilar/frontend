import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 👈 AGREGA ESTE IMPORT

const ResidenteLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // 👈 AHORA SÍ FUNCIONA

  const menuItems = [
    { path: '/residente', icon: '🏠', label: 'Inicio' },
    { path: '/residente/mis-correspondencias', icon: '📦', label: 'Correspondencia' },
    { path: '/residente/autorizados', icon: '👥', label: 'Visitantes' },
    { path: '/pago', icon: '💳', label: 'Pagar Servicios' }, // 👈 AGREGADO
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout-residente">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>🏠 ViviGest</h2>
          <p>Panel Residente</p>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="user-menu">
          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-icon">🚪</span>
            Salir
          </button>
        </div>
      </div>

      <div className="main-content">
        <Outlet />
      </div>

      <style>{`
        .layout-residente {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }
        .sidebar {
          width: 280px;
          background: white;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          padding: 20px 0;
        }
        .sidebar-header {
          padding: 0 20px 20px;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 20px;
        }
        .sidebar-header h2 {
          margin: 0 0 5px 0;
          color: #1e3a8a;
        }
        .sidebar-header p {
          margin: 0;
          color: #64748b;
          font-size: 0.9rem;
        }
        .sidebar-nav {
          flex: 1;
          padding: 0 10px;
        }
        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          background: none;
          border-radius: 8px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }
        .nav-item:hover {
          background: #f1f5f9;
        }
        .nav-item.active {
          background: #3b82f6;
          color: white;
        }
        .nav-icon {
          font-size: 1.2rem;
        }
        .nav-label {
          font-weight: 500;
        }
        .user-menu {
          padding: 20px 10px 0;
          border-top: 1px solid #e2e8f0;
        }
        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          background: #ef4444;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .logout-btn:hover {
          background: #dc2626;
        }
        .main-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default ResidenteLayout;