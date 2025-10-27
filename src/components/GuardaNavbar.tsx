import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const GuardaNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname.includes(path) ? 'nav-item active' : 'nav-item';
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="guarda-navbar">
      <div className="navbar-container">
        {/* Logo y marca */}
        <div className="navbar-brand">
          <div className="logo">
            <span>🛡️</span>
          </div>
          <div className="brand-text">
            <h2>ViviGest</h2>
            <span className="role-badge">Guarda de Seguridad</span>
          </div>
        </div>

        {/* Items de navegación - Más simples para guarda */}
        <div className="nav-items">
          <Link to="/guarda/dashboard" className={isActive('dashboard')}>
            <span className="nav-icon">📊</span>
            Inicio
          </Link>
          
          <Link to="/guarda/correspondencia" className={isActive('correspondencia')}>
            <span className="nav-icon">📬</span>
            Correspondencia
          </Link>
          
          <Link to="/guarda/correspondencia/registrar" className={isActive('registrar')}>
            <span className="nav-icon">➕</span>
            Nueva
          </Link>
          
          <Link to="/guarda/visitantes" className={isActive('visitantes')}>
            <span className="nav-icon">👤</span>
            Visitantes
          </Link>
        </div>

        {/* User menu simplificado */}
        <div className="user-menu">
          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-icon">🚪</span>
            Salir
          </button>
        </div>
      </div>

      <style>{`
        .guarda-navbar {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
          padding: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          max-width: 1400px;
          margin: 0 auto;
          height: 70px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px;
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }

        .logo span {
          font-size: 20px;
        }

        .brand-text h2 {
          margin: 0;
          font-size: 20px;
          font-weight: bold;
          color: white;
        }

        .role-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
        }

        .nav-items {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .nav-items a {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .nav-items a:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .nav-items a.active {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
        }

        .nav-icon {
          font-size: 16px;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .logout-icon {
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 16px;
            flex-wrap: wrap;
            height: auto;
            padding: 12px 16px;
          }
          
          .nav-items {
            order: 3;
            width: 100%;
            justify-content: center;
            margin-top: 12px;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </nav>
  );
};

export default GuardaNavbar;