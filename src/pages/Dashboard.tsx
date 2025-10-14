import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel Principal</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>👥 Residentes</h3>
          <p>Gestiona la información de los residentes registrados.</p>
        </div>
        <div className="dashboard-card">
          <h3>🧑‍💼 Usuarios</h3>
          <p>Administra cuentas de administradores y vigilantes.</p>
        </div>
        <div className="dashboard-card">
          <h3>🏢 Unidades</h3>
          <p>Consulta las torres y apartamentos registrados.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
