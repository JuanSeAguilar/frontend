import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PagoForm from '../components/PagoForm';
import { pagoService } from '../services/pagoService';

interface Cargo {
  idCargoCuenta: string;
  concepto: string;
  periodo: string;
  valor: number;
  unidad?: string;
}

const PagoPage: React.FC = () => {
  const navigate = useNavigate();
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const data = await pagoService.getCargosPendientes();
        setCargos(data || []);
      } catch (error) {
        console.error('Error al cargar cargos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCargos();
  }, []);

  const handlePagoExitoso = () => {
    navigate('/residente', { 
      state: { 
        mensaje: '¡Pago realizado exitosamente! 🎉',
        tipo: 'exito'
      } 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Cargando cargos...</span>
      </div>
    );
  }

  if (!selectedCargo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Seleccionar Cargo a Pagar</h2>
            <p className="text-gray-600">Elige el cargo que deseas pagar</p>
          </div>

          {cargos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg mb-4">No tienes cargos pendientes</p>
              <button 
                onClick={() => navigate('/residente')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Volver al Dashboard
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cargos.map(cargo => (
                <div 
                  key={cargo.idCargoCuenta} 
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{cargo.concepto}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Periodo:</span> {cargo.periodo}
                    </p>
                    {cargo.unidad && (
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Unidad:</span> {cargo.unidad}
                      </p>
                    )}
                    <p className="text-xl font-bold text-green-600 mt-2">
                      ${cargo.valor.toLocaleString()} COP
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedCargo(cargo)}
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                  >
                    Pagar Ahora
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <button 
              onClick={() => setSelectedCargo(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a cargos
            </button>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Resumen del Cargo</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Concepto:</span>
                  <p className="text-gray-800">{selectedCargo.concepto}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Periodo:</span>
                  <p className="text-gray-800">{selectedCargo.periodo}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Valor:</span>
                  <p className="text-green-600 font-bold">${selectedCargo.valor.toLocaleString()} COP</p>
                </div>
              </div>
            </div>
          </div>

          <PagoForm
            monto={selectedCargo.valor}
            concepto={selectedCargo.concepto}
            periodo={selectedCargo.periodo}
            onPagoExitoso={handlePagoExitoso}
            onCancelar={() => setSelectedCargo(null)}
            idCargoCuenta={selectedCargo.idCargoCuenta}
          />
        </div>
      </div>
    </div>
  );
};

export default PagoPage;