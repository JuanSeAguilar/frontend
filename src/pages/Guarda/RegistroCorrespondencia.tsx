import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../src/api/axios.ts"; 

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

  // ESTADO CORREGIDO - observacion en singular
  const [form, setForm] = useState({
    idUnidad: "",
    idTipoCorrespondencia: 0,
    remitente: "",
    observacion: "", // ✅ CORREGIDO: estaba 'observacion'
  });

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        // ✅ URLs CORREGIDAS - apuntan al controller de correspondencia
        const resUnidades = await api.get('/api/guarda/correspondencia/unidades'); 
        setUnidades(resUnidades.data);

        const resTipos = await api.get('/api/guarda/correspondencia/tiposCorrespondencia');
        setTipos(resTipos.data);

        // Set primer tipo como default si hay datos
        if (resTipos.data.length > 0) {
          setForm(prev => ({ 
            ...prev, 
            idTipoCorrespondencia: resTipos.data[0].idTipoCorrespondencia 
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setForm((prev) => ({ 
      ...prev, 
      [name]: name === 'idTipoCorrespondencia' ? parseInt(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.idUnidad || !form.remitente) {
      alert("⚠️ Debes seleccionar una unidad y escribir el remitente.");
      return;
    }

    setLoading(true);

    try {
      console.log("📤 Enviando a la API:", form);
      
      // ✅ URL CORRECTA
      const response = await api.post('/api/guarda/correspondencia', form);
      
      console.log("✅ Respuesta de la API:", response.data);
      alert("✅ Correspondencia registrada exitosamente");
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

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 space-y-4">
        
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
            <option key={t.idTipoCorrespondencia} value={t.idTipoCorrespondencia}>
              {t.nombre}
            </option>
          ))}
        </select>

        {/* TEXTAREA - NAME CORREGIDO */}
        <textarea
          name="observacion" // ✅ CORREGIDO
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
            {loading ? 'Registrando...' : 'Registrar'}
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