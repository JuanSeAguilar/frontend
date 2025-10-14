import React, { useState } from "react";
import { residenteService } from "../services/residenteService";

const RegistroResidente: React.FC = () => {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    numeroDocumento: "",
    idTipoDocumento: "",
    torre: "",
    unidad: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await residenteService.create(form);
      alert("✅ Residente registrado correctamente");
      setForm({
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        numeroDocumento: "",
        idTipoDocumento: "",
        torre: "",
        unidad: "",
      });
    } catch {
      alert("❌ Error al registrar residente");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Registro de Residente</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="nombres"
            placeholder="Nombres"
            value={form.nombres}
            onChange={handleChange}
            required
          />
          <input
            name="apellidos"
            placeholder="Apellidos"
            value={form.apellidos}
            onChange={handleChange}
            required
          />
          <input
            name="correo"
            type="email"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={handleChange}
            required
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            required
          />
          <input
            name="numeroDocumento"
            placeholder="Número de documento"
            value={form.numeroDocumento}
            onChange={handleChange}
            required
          />
          <select
            name="idTipoDocumento"
            value={form.idTipoDocumento}
            onChange={handleChange}
            required
          >
            <option value="">Tipo de documento</option>
            <option value="1">Cédula</option>
            <option value="2">Pasaporte</option>
          </select>
          <input
            name="torre"
            placeholder="Torre o edificio"
            value={form.torre}
            onChange={handleChange}
            required
          />
          <input
            name="unidad"
            placeholder="Unidad o apartamento"
            value={form.unidad}
            onChange={handleChange}
            required
          />

          <button type="submit">Registrar residente</button>
        </form>
      </div>
    </div>
  );
};

export default RegistroResidente;
