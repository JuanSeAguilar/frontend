import { useState } from "react";
import api from "../api/axios";

export default function RegisterUsuario() {
  const [form, setForm] = useState({
    idTipoDocumento: 1,
    numeroDocumento: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    correo: "",
    contrasena: "",
    idRol: 3 // Guarda por defecto (puedes cambiar según el caso)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/Registro/usuario", form);
      alert("Usuario registrado con éxito");
    } catch (err) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario (Admin / Guarda)</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Documento" name="numeroDocumento" onChange={handleChange}/>
        <input className="form-control mb-2" placeholder="Nombres" name="nombres" onChange={handleChange}/>
        <input className="form-control mb-2" placeholder="Apellidos" name="apellidos" onChange={handleChange}/>
        <input className="form-control mb-2" placeholder="Teléfono" name="telefono" onChange={handleChange}/>
        <input className="form-control mb-2" placeholder="Correo" name="correo" onChange={handleChange}/>
        <input type="password" className="form-control mb-2" placeholder="Contraseña" name="contrasena" onChange={handleChange}/>
        <label htmlFor="idRol" className="form-label">Rol</label>
        <select id="idRol" className="form-control mb-3" name="idRol" onChange={handleChange}>
          <option value={1}>Administrador</option>
          <option value={3}>Guarda</option>
        </select>
        <button className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
}
