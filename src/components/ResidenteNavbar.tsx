import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ResidenteNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();   // 📌 ← ahora obtenemos el usuario real
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname.includes(path) ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="res-navbar">
      <div className="res-navbar-container">

        {/* BRAND */}
        <div className="brand">
          <div className="logo">🏢</div>
          <div className="brand-text">
            <h2>ViviGest</h2>
            <span className="role">Residente</span>
          </div>
        </div>

        {/* LINKS */}
        <div className={`links ${menuOpen ? "open" : ""}`}>
  <Link to="/residente/dashboard" className={isActive("dashboard")}>
    🏠 Dashboard
  </Link>

  

  <Link to="/residente/autorizados" className={isActive("autorizados")}>
    👥 Visitantes Autorizados
  </Link>

  <Link to="/residente/mis-correspondencias" className={isActive("correspondencias")}>
    📬 Correspondencia
  </Link>
</div>

        {/* USER */}
        <div className="user">
          <span className="username">{user?.nombre ?? "Usuario"}</span> {/* ← nombre real */}
          <button onClick={handleLogout} className="logout-btn">🚪 Salir</button>
        </div>

        {/* MOBILE MENU */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      <style>{`
        .res-navbar {
          background: linear-gradient(135deg, #0f172a 0%, #6366f1 100%);
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .res-navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          height: 70px;
        }

        /* BRAND */
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          font-size: 32px;
        }

        .brand-text h2 {
          margin: 0;
          color: white;
          font-size: 20px;
          font-weight: 700;
        }

        .role {
          font-size: 12px;
          color: #cbd5e1;
          background: rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 6px;
          margin-top: 2px;
          display: inline-block;
        }

        /* LINKS */
        .links {
          display: flex;
          gap: 18px;
        }

        .nav-link {
          color: white;
          padding: 10px 14px;
          border-radius: 10px;
          font-weight: 500;
          transition: 0.25s ease;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 0 10px rgba(255,255,255,0.2);
        }

        /* USER SECTION */
        .user {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .username {
          color: white;
          font-weight: 600;
        }

        .logout-btn {
          background: rgba(255,255,255,0.2);
          padding: 8px 14px;
          border-radius: 10px;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.35);
          transform: scale(1.05);
        }

        /* MOBILE MENU */
        .menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 26px;
          color: white;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .links {
            display: none;
          }

          .menu-btn {
            display: block;
          }

          .links.open {
            display: flex;
            flex-direction: column;
            position: absolute;
            left: 0;
            top: 70px;
            width: 100%;
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(6px);
            padding: 20px;
            gap: 18px;
          }
        }
      `}</style>
    </nav>
  );
};

export default ResidenteNavbar;
