import React, { useEffect, useState } from 'react';
import { pagoService } from '../services/pagoService';
import PagoForm from '../components/PagoForm';

interface Cargo {
  idCargoCuenta: string;
  unidad: string;
  periodo: string;
  concepto: string;
  valor: number;
}

const CargosPendientes: React.FC = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);

  useEffect(() => {
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pagoService.getCargosPendientes();
      setCargos(data);
    } catch (err) {
      setError('Error al cargar cargos. Intenta refrescar.');
      console.error('Error al cargar cargos:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SI HAY CARGO SELECCIONADO → MOSTRAR SOLO EL PAGO FORM
  if (selectedCargo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">

          <button
            onClick={() => setSelectedCargo(null)}
            className="mb-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            ⬅ Volver
          </button>

          <PagoForm
            idCargoCuenta={selectedCargo.idCargoCuenta}
            monto={selectedCargo.valor}
            concepto={selectedCargo.concepto}
            periodo={selectedCargo.periodo}
            onPagoExitoso={() => {
              setSelectedCargo(null);
              fetchCargos(); // Recargar cargos después del pago
            }}
            onCancelar={() => setSelectedCargo(null)}
          />
        </div>
      </div>
    );
  }

  // 🔥 SI NO HAY CARGO SELECCIONADO → MOSTRAR LISTA NORMAL
  const totalPendiente = cargos.reduce((sum, cargo) => sum + cargo.valor, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Cargando cargos pendientes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mis Cargos Pendientes</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={fetchCargos}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refrescar
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Mis Cargos Pendientes</h2>
      
      {cargos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">¡Felicidades! No tienes cargos pendientes.</p>
          <div className="mt-4">
            <span className="text-4xl">🎉</span>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Resumen</h3>
            <p className="text-gray-600">
              Total pendiente: <span className="font-bold text-red-600">${totalPendiente.toFixed(2)}</span>
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {cargos.map((cargo) => (
              <div key={cargo.idCargoCuenta} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Unidad: <span className="font-medium">{cargo.unidad}</span></p>
                  <p className="text-sm text-gray-500">Período: <span className="font-medium">{cargo.periodo}</span></p>
                  <p className="text-sm text-gray-500">Concepto: <span className="font-medium">{cargo.concepto}</span></p>
                  <p className="text-lg font-bold text-blue-600 mt-2">Valor: ${cargo.valor.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => setSelectedCargo(cargo)}
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Pagar Ahora
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CargosPendientes;
