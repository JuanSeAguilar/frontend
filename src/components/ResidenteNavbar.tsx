import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResidenteNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname.includes(path) ? 'nav-item active' : 'nav-item';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="residente-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo">🏢</div>
          <div className="brand-text">
            <h2>ViviGest</h2>
            <span className="role-badge">Residente</span>
          </div>
        </div>

        <div className="nav-items">
          <Link to="/residente/dashboard" className={isActive('dashboard')}>🏠 Dashboard</Link>
          <Link to="/residente/mis-unidades" className={isActive('mis-unidades')}>🏘️ Mis Unidades</Link>
          <Link to="/residente/visitantes" className={isActive('visitantes')}>👥 Visitantes</Link>
          <Link to="/residente/correspondencia" className={isActive('correspondencia')}>📬 Correspondencia</Link>
        </div>

        <div className="user-menu">
          <span className="user-name">Juan Pérez</span>
          <button onClick={handleLogout} className="logout-btn">🚪 Salir</button>
        </div>
      </div>

      <style>{`
        .residente-navbar {
          background: linear-gradient(135deg, #0f172a 0%, #6366f1 100%);
          color: white;
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          height: 70px;
        }
        .nav-items a {
          margin-right: 12px;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-weight: 500;
        }
        .nav-items a.active {
          background: rgba(255, 255, 255, 0.2);
        }
        .logout-btn {
          background: rgba(255,255,255,0.2);
          padding: 6px 12px;
          border-radius: 6px;
        }
        @media (max-width: 768px) {
          .nav-items { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default ResidenteNavbar;
