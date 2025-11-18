import React, { useState, useEffect } from "react";
import { residenteService } from "../services/residenteService";

const ResidentesList: React.FC = () => {
  const [residentes, setResidentes] = useState<any[]>([]);

  useEffect(() => {
    residenteService.getAll().then(setResidentes).catch(() => alert("Error cargando residentes"));
  }, []);

  return (
    <div className="list-container">
      <h2>Residentes registrados</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Torre</th>
            <th>Unidad</th>
          </tr>
        </thead>
        <tbody>
          {residentes.map((r) => (
            <tr key={r.id}>
              <td>{r.nombres} {r.apellidos}</td>
              <td>{r.correo}</td>
              <td>{r.torre}</td>
              <td>{r.unidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResidentesList;
