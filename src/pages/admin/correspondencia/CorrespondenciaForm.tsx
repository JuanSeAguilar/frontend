import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Datos mock - reemplazan al servicio
const mockTipos = [
  { idTipoCorrespondencia: 1, nombre: 'Paquete' },
  { idTipoCorrespondencia: 2, nombre: 'Documento' },
  { idTipoCorrespondencia: 3, nombre: 'Encomienda' },
  { idTipoCorrespondencia: 4, nombre: 'Carta' }
];

const mockUnidades = [
  { idUnidad: '123e4567-e89b-12d3-a456-426614174000', codigoCompleto: 'Torre A - 101', torreNombre: 'Torre A' },
  { idUnidad: '123e4567-e89b-12d3-a456-426614174001', codigoCompleto: 'Torre A - 102', torreNombre: 'Torre A' },
  { idUnidad: '123e4567-e89b-12d3-a456-426614174002', codigoCompleto: 'Torre B - 201', torreNombre: 'Torre B' },
  { idUnidad: '123e4567-e89b-12d3-a456-426614174003', codigoCompleto: 'Torre B - 202', torreNombre: 'Torre B' }
];

const CorrespondenciaForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tipos, setTipos] = useState(mockTipos);
  const [unidades, setUnidades] = useState(mockUnidades);

  const [formData, setFormData] = useState({
    idUnidad: '',
    idTipoCorrespondencia: 1,
    remitente: '',
    observacion: ''
  });

  // Simular carga de datos
  useEffect(() => {
    console.log('📦 Datos mock cargados');
    // Seleccionar primer tipo por defecto
    if (tipos.length > 0) {
      setFormData(prev => ({
        ...prev,
        idTipoCorrespondencia: tipos[0].idTipoCorrespondencia
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!formData.idUnidad || !formData.remitente.trim()) {
      alert('Por favor selecciona una unidad y completa el remitente');
      return;
    }

    setLoading(true);
    
    try {
      // Simular envío a API
      console.log('📤 Enviando datos (mock):', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('✅ Correspondencia registrada exitosamente!');
      navigate('/admin/correspondencia');
    } catch (error) {
      console.error('❌ Error simulado:', error);
      alert('Error al registrar correspondencia');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'idTipoCorrespondencia' ? parseInt(value) : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <span className="text-white text-2xl">📬</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Registrar Correspondencia
              </h1>
              <p className="text-gray-600">Complete los datos del nuevo registro</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/admin/correspondencia')}
            className="group flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            Volver a la Lista
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-blue-50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">📋</div>
              Información de la Correspondencia
            </h2>
          </div>

          <div className="p-8 space-y-6">
            {/* Grid de campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Unidad */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <div className="bg-blue-100 p-1 rounded">🏢</div>
                  Unidad Destino *
                </label>
                <select
                  name="idUnidad"
                  value={formData.idUnidad}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white hover:border-gray-300"
                >
                  <option value="">Selecciona una unidad</option>
                  {unidades.map((unidad) => (
                    <option key={unidad.idUnidad} value={unidad.idUnidad}>
                      {unidad.codigoCompleto}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de Correspondencia */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <div className="bg-green-100 p-1 rounded">📦</div>
                  Tipo de Correspondencia *
                </label>
                <select
                  name="idTipoCorrespondencia"
                  value={formData.idTipoCorrespondencia}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white hover:border-gray-300"
                >
                  {tipos.map((tipo) => (
                    <option key={tipo.idTipoCorrespondencia} value={tipo.idTipoCorrespondencia}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Remitente */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <div className="bg-orange-100 p-1 rounded">👤</div>
                Remitente *
              </label>
              <input
                type="text"
                name="remitente"
                value={formData.remitente}
                onChange={handleChange}
                required
                placeholder="Ej: Servientrega, DHL, Familiar, Empresa..."
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white hover:border-gray-300"
              />
            </div>

            {/* Observaciones */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <div className="bg-purple-100 p-1 rounded">📝</div>
                Observaciones
              </label>
              <textarea
                name="observacion"
                value={formData.observacion}
                onChange={handleChange}
                placeholder="Descripción del paquete, instrucciones especiales, detalles adicionales..."
                rows={4}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white hover:border-gray-300 resize-vertical"
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 group bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Registrando...
                  </>
                ) : (
                  <>
                    <span className="text-lg">✅</span>
                    Registrar Correspondencia
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/correspondencia')}
                className="flex-1 group bg-white text-gray-700 p-4 rounded-xl font-semibold border-2 border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <span className="text-lg">❌</span>
                Cancelar
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border-t border-gray-200 p-4">
            <p className="text-center text-gray-600 text-sm">
              💡 Todos los campos marcados con * son obligatorios
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CorrespondenciaForm;