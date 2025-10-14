import React, { useState } from "react";
import { visitaService } from "../../services/visitaService";

const RegistroVisita: React.FC = () => {
  const [form, setForm] = useState({
    nombreVisitante: "",
    tipoDocumento: "",
    numeroDocumento: "",
    torre: "",
    unidad: "",
    motivo: "",
    placaVehiculo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await visitaService.registrarVisita(form);
      alert("✅ Visita registrada correctamente");
      setForm({
        nombreVisitante: "",
        tipoDocumento: "",
        numeroDocumento: "",
        torre: "",
        unidad: "",
        motivo: "",
        placaVehiculo: "",
      });
    } catch {
      alert("❌ Error al registrar la visita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <div className="card">
        <h2>Registro de Visita</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            name="nombreVisitante"
            placeholder="Nombre del visitante"
            value={form.nombreVisitante}
            onChange={handleChange}
            required
          />

          <select
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
            required
          >
            <option value="">Tipo de documento</option>
            <option value="CC">Cédula</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="PA">Pasaporte</option>
          </select>

          <input
            name="numeroDocumento"
            placeholder="Número de documento"
            value={form.numeroDocumento}
            onChange={handleChange}
            required
          />

          <input
            name="torre"
            placeholder="Torre"
            value={form.torre}
            onChange={handleChange}
            required
          />

          <input
            name="unidad"
            placeholder="Unidad / Apartamento"
            value={form.unidad}
            onChange={handleChange}
            required
          />

          <input
            name="motivo"
            placeholder="Motivo de la visita"
            value={form.motivo}
            onChange={handleChange}
            required
          />

          <input
            name="placaVehiculo"
            placeholder="Placa del vehículo (opcional)"
            value={form.placaVehiculo}
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Visita"}
          </button>
        </form>
      </div>

      <style>{`
        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f9fafb, #e0f2fe);
          padding: 20px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        h2 {
          color: #1e3a8a;
          margin-bottom: 24px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        input, select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 14px;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
};

export default RegistroVisita;
