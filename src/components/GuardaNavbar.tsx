import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuardaNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) =>
    location.pathname.toLowerCase().includes(path.toLowerCase())
      ? "gnb-item--active"
      : "";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="guarda-navbar">
      <div className="gnb-inner">
        {/* Brand */}
        <div className="gnb-brand">
          <div className="gnb-logo">
            <span>🛡️</span>
          </div>
          <div className="gnb-brand-text">
            <h2>ViviGest</h2>
            <span className="gnb-role">Guarda de seguridad</span>
          </div>
        </div>

        {/* Links */}
        <div className="gnb-links">
          <Link
            to="/Guarda/DashboardGuarda"
            className={`gnb-item ${isActive("dashboardguarda")}`}
          >
            <span className="gnb-icon">📊</span>
            <span>Inicio</span>
          </Link>

          <Link
            to="/Guarda/correspondencia-pendiente"
            className={`gnb-item ${isActive("correspondencia-pendiente")}`}
          >
            <span className="gnb-icon">📬</span>
            <span>Correspondencia</span>
          </Link>

          <Link
            to="/Guarda/registro-correspondencia"
            className={`gnb-item ${isActive("registro-correspondencia")}`}
          >
            <span className="gnb-icon">➕</span>
            <span>Nueva</span>
          </Link>

          <Link
            to="/Guarda/visitas"
            className={`gnb-item ${isActive("visitas")}`}
          >
            <span className="gnb-icon">👤</span>
            <span>Visitantes</span>
          </Link>
        </div>

        {/* User / logout */}
        <div className="gnb-user">
          <button onClick={handleLogout} className="gnb-logout">
            <span className="gnb-logout-icon">🚪</span>
            <span>Salir</span>
          </button>
        </div>
      </div>

      <style>{`
        .guarda-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.35);
          color: #ffffff;
        }

        .gnb-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        /* Brand */
        .gnb-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .gnb-logo {
          width: 38px;
          height: 38px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .gnb-logo span {
          font-size: 20px;
        }

        .gnb-brand-text h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
        }

        .gnb-role {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(4, 120, 87, 0.85);
          border: 1px solid rgba(16, 185, 129, 0.7);
        }

        /* Links */
        .gnb-links {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .gnb-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          color: #ecfdf5;
          border: 1px solid transparent;
          background: transparent;
          transition:
            background 0.15s ease,
            transform 0.1s ease,
            box-shadow 0.15s ease,
            border-color 0.15s ease;
        }

        .gnb-item:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(209, 250, 229, 0.7);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.3);
          transform: translateY(-1px);
        }

        .gnb-item--active {
          background: rgba(236, 253, 245, 0.2);
          border-color: rgba(209, 250, 229, 0.9);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.35);
        }

        .gnb-icon {
          font-size: 16px;
        }

        /* User */
        .gnb-user {
          display: flex;
          align-items: center;
        }

        .gnb-logout {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 999px;
          border: 1px solid rgba(248, 250, 252, 0.6);
          background: rgba(248, 250, 252, 0.1);
          padding: 6px 12px;
          font-size: 12px;
          color: #f9fafb;
          cursor: pointer;
          font-weight: 500;
          transition:
            background 0.15s ease,
            transform 0.1s ease,
            box-shadow 0.15s ease;
        }

        .gnb-logout:hover {
          background: rgba(248, 250, 252, 0.22);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.35);
          transform: translateY(-1px);
        }

        .gnb-logout-icon {
          font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .gnb-inner {
            flex-wrap: wrap;
            padding: 10px 12px 12px;
          }

          .gnb-links {
            order: 3;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 4px;
          }

          .gnb-user {
            margin-left: auto;
          }
        }
      `}</style>
    </nav>
  );
};

export default GuardaNavbar;
