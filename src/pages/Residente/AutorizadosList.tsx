import React, { useState, useEffect } from "react";
import { autorizadosService } from "../../services/autorizadosService";

type Autorizado = {
  idAutorizado: number;
  nombre: string;
  numeroDocumento: string;
  relacion: string;
};

const AutorizadosList: React.FC = () => {
  const [autorizados, setAutorizados] = useState<Autorizado[]>([]);
  const [nuevo, setNuevo] = useState({ nombre: "", numeroDocumento: "", relacion: "" });

  const cargar = async () => {
    const data = await autorizadosService.obtenerPorResidente();
    setAutorizados(data);
  };

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault();
    await autorizadosService.registrar(nuevo);
    setNuevo({ nombre: "", numeroDocumento: "", relacion: "" });
    await cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="autorizados-container">
      <div className="card">
        <h2>👥 Visitantes Autorizados</h2>

        <form className="form" onSubmit={registrar}>
          <input
            placeholder="Nombre completo"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            required
          />
          <input
            placeholder="Documento"
            value={nuevo.numeroDocumento}
            onChange={(e) => setNuevo({ ...nuevo, numeroDocumento: e.target.value })}
            required
          />
          <input
            placeholder="Relación (amigo, familiar, etc.)"
            value={nuevo.relacion}
            onChange={(e) => setNuevo({ ...nuevo, relacion: e.target.value })}
            required
          />
          <button type="submit" className="btn-primary">Agregar autorizado</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Relación</th>
            </tr>
          </thead>
          <tbody>
            {autorizados.map((a) => (
              <tr key={a.idAutorizado}>
                <td>{a.nombre}</td>
                <td>{a.numeroDocumento}</td>
                <td>{a.relacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutorizadosList;
