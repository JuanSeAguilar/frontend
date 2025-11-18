// src/pages/guarda/RegistroVisita.tsx
import React, { useEffect, useState } from "react";
import { catalogoService } from "../../services/CatalogoService";
import { visitaService } from "../../services/visitaService";

const RegistroVisita: React.FC = () => {
  const [torres, setTorres] = useState<{idTorre:string; nombre:string}[]>([]);
  const [unidades, setUnidades] = useState<{idUnidad:string; codigo:string}[]>([]);
  const [selTorre, setSelTorre] = useState("");
  const [selUnidad, setSelUnidad] = useState("");

  const [form, setForm] = useState({
    nombreVisitante: "",
    tipoDocumento: "",
    numeroDocumento: "",
    motivo: "",
    placaVehiculo: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => { catalogoService.torres().then(setTorres); }, []);
  useEffect(() => {
    setSelUnidad("");
    if (selTorre) catalogoService.unidadesPorTorre(selTorre).then(setUnidades);
    else setUnidades([]);
  }, [selTorre]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selUnidad) return alert("Selecciona una unidad.");
    setLoading(true);
    try {
      await visitaService.registrarVisitaByUnidad({
        idUnidad: selUnidad,
        nombreVisitante: form.nombreVisitante,
        tipoDocumento: form.tipoDocumento as any, // "CC" | "CE" | "NIT" | "PAS"
        numeroDocumento: form.numeroDocumento,
        motivo: form.motivo,
        placaVehiculo: form.placaVehiculo || null,
      });
      alert("✅ Visita registrada");
      setForm({ nombreVisitante:"", tipoDocumento:"", numeroDocumento:"", motivo:"", placaVehiculo:"" });
      setSelUnidad("");
      // si quieres mantener torre, no limpies selTorre
    } catch (err:any) {
      console.error(err?.response?.data || err);
      alert("❌ " + (err?.response?.data?.message || "Error al registrar"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <div className="card">
        <h2>Registro de Visita (Guarda)</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input name="nombreVisitante" placeholder="Nombre del visitante"
            value={form.nombreVisitante} onChange={handleChange} required />

          <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} required>
            <option value="">Tipo de documento</option>
            <option value="CC">Cédula</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="NIT">NIT</option>
            <option value="PAS">Pasaporte</option>
          </select>

          <input name="numeroDocumento" placeholder="Número de documento"
            value={form.numeroDocumento} onChange={handleChange} required />

          <select value={selTorre} onChange={(e) => setSelTorre(e.target.value)} required>
            <option value="">Selecciona torre</option>
            {torres.map(t => <option key={t.idTorre} value={t.idTorre}>{t.nombre}</option>)}
          </select>

          <select value={selUnidad} onChange={(e) => setSelUnidad(e.target.value)} required disabled={!selTorre}>
            <option value="">Selecciona unidad</option>
            {unidades.map(u => <option key={u.idUnidad} value={u.idUnidad}>{u.codigo}</option>)}
          </select>

          <input name="motivo" placeholder="Motivo de la visita"
            value={form.motivo} onChange={handleChange} required />

          <input name="placaVehiculo" placeholder="Placa del vehículo (opcional)"
            value={form.placaVehiculo} onChange={handleChange} />

          <button type="submit" className="btn-primary" disabled={loading || !selUnidad}>
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
