import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistroCorrespondencia: React.FC = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    torre: "",
    unidad: "",
    remitente: "",
    tipo: "Paquete",
    observaciones: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.torre || !form.unidad || !form.remitente) {
      alert("⚠️ Todos los campos con * son obligatorios");
      return;
    }

    alert(`✅ Correspondencia registrada para ${form.torre} - ${form.unidad}`);
    nav("/Guarda/correspondencia-pendiente");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📬 Registro de Correspondencia</h1>
      <p className="mb-6 text-gray-600">
        Formulario para registrar paquetes y documentos recibidos.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="torre"
            placeholder="🏢 Torre *"
            value={form.torre}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="unidad"
            placeholder="🚪 Unidad *"
            value={form.unidad}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="remitente"
            placeholder="👤 Remitente *"
            value={form.remitente}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Paquete</option>
            <option>Documento</option>
            <option>Carta</option>
            <option>Otro</option>
          </select>
        </div>

        <textarea
          name="observaciones"
          placeholder="📝 Observaciones (opcional)"
          value={form.observaciones}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => nav("/Guarda")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroCorrespondencia;
