import React, { useState, useEffect } from "react";
import { residenteService } from "../services/residenteService";
import api from "../api/axios";

const RegistroResidente: React.FC = () => {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    numeroDocumento: "",
    idTipoDocumento: "",
    idUnidad: "",
  });

  const [torres, setTorres] = useState<{ idTorre: string; nombre: string }[]>([]);
  const [unidades, setUnidades] = useState<{ idUnidad: string; codigo: string }[]>([]);
  const [torreSeleccionada, setTorreSeleccionada] = useState("");

  // 🔹 Cargar torres al inicio
  useEffect(() => {
    api.get("/api/catalogo/torres")
      .then(res => setTorres(res.data))
      .catch(() => alert("Error al cargar torres"));
  }, []);

  // 🔹 Cargar unidades cuando cambia la torre seleccionada
  useEffect(() => {
    if (!torreSeleccionada) return;
    api.get(`/api/catalogo/unidades?torreId=${torreSeleccionada}`)
      .then(res => setUnidades(res.data))
      .catch(() => alert("Error al cargar unidades"));
  }, [torreSeleccionada]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await residenteService.create({
        ...form,
        idUnidad: form.idUnidad, // asegúrate de enviar el GUID correcto
        idTipoDocumento: form.idTipoDocumento,
      });
      alert("✅ Residente registrado correctamente");
      setForm({
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        numeroDocumento: "",
        idTipoDocumento: "",
        idUnidad: "",
      });
      setTorreSeleccionada("");
      setUnidades([]);
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

          <select
            value={torreSeleccionada}
            onChange={(e) => setTorreSeleccionada(e.target.value)}
            required
          >
            <option value="">Seleccione Torre</option>
            {torres.map((t) => (
              <option key={t.idTorre} value={t.idTorre}>
                {t.nombre}
              </option>
            ))}
          </select>

          <select
            name="idUnidad"
            value={form.idUnidad}
            onChange={handleChange}
            required
            disabled={!unidades.length}
          >
            <option value="">Seleccione Unidad</option>
            {unidades.map((u) => (
              <option key={u.idUnidad} value={u.idUnidad}>
                {u.codigo}
              </option>
            ))}
          </select>

          <button type="submit">Registrar residente</button>
        </form>
      </div>
    </div>
  );
};

export default RegistroResidente;
