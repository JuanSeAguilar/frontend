import { useState } from "react";
import api from "../api/axios";

export default function RegisterResidente() {
  const [form, setForm] = useState({
    idTipoDocumento: 1,
    numeroDocumento: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    correo: "",
    contrasena: "",
    idUnidad: "" // Aquí deberías pasar el GUID de la unidad seleccionada
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/registro/residente", form);
      alert("Residente registrado con éxito");
    } catch (err) {
      alert("Error al registrar residente");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Residente</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Documento" name="numeroDocumento" onChange={handleChange}/>
        <input className="form-control mb-2" placeholder="Nombres" name="nombres" onChange={handleChange}/>
        <input className="form-control mb-2" placeholder="Apellidos" name="apellidos" onChange={handleChange}/>
        <input className="form-control mb-2" placeholder="Teléfono" name="telefono" onChange={handleChange}/>
        <input className="form-control mb-2" placeholder="Correo" name="correo" onChange={handleChange}/>
        <input type="password" className="form-control mb-2" placeholder="Contraseña" name="contrasena" onChange={handleChange}/>
        <input className="form-control mb-2" placeholder="IdUnidad (GUID)" name="idUnidad" onChange={handleChange}/>
        <button className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
}
