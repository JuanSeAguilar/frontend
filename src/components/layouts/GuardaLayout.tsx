import React from "react";
import { Outlet } from "react-router-dom";
import GuardaNavbar from "../GuardaNavbar";

const GuardaLayout: React.FC = () => {
  return (
    <div className="guarda-layout">
      <GuardaNavbar />
      <main className="guarda-content">
        <div className="guarda-content-inner">
          <Outlet />
        </div>
      </main>

      <style>{`
        .guarda-layout {
          min-height: 100vh;
          background: radial-gradient(circle at top, #ecfdf5 0, #d1fae5 40%, #f9fafb 100%);
        }

        .guarda-content {
          padding: 18px 12px 30px;
        }

        .guarda-content-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default GuardaLayout;
