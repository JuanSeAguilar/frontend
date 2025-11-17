import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { correspondenciaService } from "../../services/correspondenciaService";

interface UnidadApi {
  idUnidad: string;
  nombreCompleto: string;
}

interface TipoCorrespondenciaApi {
  idTipoCorrespondencia: number;
  nombre: string;
}

const RegistroCorrespondencia: React.FC = () => {
  const nav = useNavigate();

  const [unidades, setUnidades] = useState<UnidadApi[]>([]);
  const [tipos, setTipos] = useState<TipoCorrespondenciaApi[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    idUnidad: "",
    idTipoCorrespondencia: "", // lo manejamos como string y casteamos al enviar
    remitente: "",
    observacion: "",
  });

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const resUnidades = await correspondenciaService.getUnidades();
        setUnidades(resUnidades);

        const resTipos = await correspondenciaService.getTipos();
        setTipos(resTipos);

        if (resTipos.length > 0) {
          setForm((prev) => ({
            ...prev,
            idTipoCorrespondencia: resTipos[0].idTipoCorrespondencia.toString(),
          }));
        }
      } catch (error) {
        console.error("Error cargando datos iniciales", error);
        alert("Error cargando datos. Revise la consola.");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.idUnidad || !form.remitente || !form.idTipoCorrespondencia) {
      alert("⚠️ Debes seleccionar una unidad, tipo y escribir el remitente.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        idUnidad: form.idUnidad,
        idTipoCorrespondencia: parseInt(form.idTipoCorrespondencia, 10),
        remitente: form.remitente,
        observacion: form.observacion || undefined,
      };

      console.log("📤 Enviando a la API:", payload);

      await correspondenciaService.registrar(payload);

      alert("✅ Correspondencia registrada exitosamente");

      // Reset suave
      setForm((prev) => ({
        idUnidad: "",
        idTipoCorrespondencia: prev.idTipoCorrespondencia, // deja el mismo tipo seleccionado
        remitente: "",
        observacion: "",
      }));

      nav("/Guarda/correspondencia-pendiente");
    } catch (error) {
      console.error("❌ Error al registrar correspondencia:", error);
      alert("Error al registrar. Revise la consola.");
    } finally {
      setLoading(false);
    }
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
        {/* SELECT UNIDAD */}
        <select
          name="idUnidad"
          value={form.idUnidad}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Selecciona una Unidad *</option>
          {unidades.map((u) => (
            <option key={u.idUnidad} value={u.idUnidad}>
              {u.nombreCompleto}
            </option>
          ))}
        </select>

        {/* INPUT REMITENTE */}
        <input
          name="remitente"
          placeholder="👤 Remitente *"
          value={form.remitente}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        {/* SELECT TIPO */}
        <select
          name="idTipoCorrespondencia"
          value={form.idTipoCorrespondencia}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Selecciona un tipo *</option>
          {tipos.map((t) => (
            <option
              key={t.idTipoCorrespondencia}
              value={t.idTipoCorrespondencia}
            >
              {t.nombre}
            </option>
          ))}
        </select>

        {/* TEXTAREA OBSERVACIÓN */}
        <textarea
          name="observacion"
          placeholder="📝 Observaciones (opcional)"
          value={form.observacion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {loading ? "Registrando..." : "Registrar"}
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
