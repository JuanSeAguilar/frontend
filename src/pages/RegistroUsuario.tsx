import React, { useState } from "react";
import { usuarioService } from "../services/usuarioService";

const RegistroUsuario: React.FC = () => {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    numeroDocumento: "",
    idTipoDocumento: "",
    idRol: "",
    contrasena: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await usuarioService.create(form);
      alert("✅ Usuario registrado correctamente");
      setForm({
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        numeroDocumento: "",
        idTipoDocumento: "",
        idRol: "",
        contrasena: "",
      });
    } catch {
      alert("❌ Error al registrar usuario");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input name="nombres" placeholder="Nombres" value={form.nombres} onChange={handleChange} required />
          <input name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} required />
          <input name="correo" type="email" placeholder="Correo electrónico" value={form.correo} onChange={handleChange} required />
          <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
          <input name="numeroDocumento" placeholder="Número de documento" value={form.numeroDocumento} onChange={handleChange} required />
          
          <select name="idTipoDocumento" value={form.idTipoDocumento} onChange={handleChange} required>
            <option value="">Tipo de documento</option>
            <option value="1">Cédula</option>
            <option value="2">Pasaporte</option>
          </select>

          <select name="idRol" value={form.idRol} onChange={handleChange} required>
            <option value="">Seleccione rol</option>
            <option value="1">Administrador</option>
            <option value="3">Guarda</option>
          </select>

          <input name="contrasena" type="password" placeholder="Contraseña" value={form.contrasena} onChange={handleChange} required />

          <button type="submit">Registrar usuario</button>
        </form>
      </div>

      <style>{`
        .form-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 64px);
          background: #f8f9ff;
        }
        .form-card {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          width: 420px;
        }
        .form-card h2 {
          text-align: center;
          color: #333;
          margin-bottom: 24px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        input, select {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }
        button {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default RegistroUsuario;
