// components/CargosPendientes.tsx
import React, { useState, useEffect } from 'react';
import { cargoService } from '../services/cargoService';

const CargosPendientes: React.FC = () => {
  const [cargos, setCargos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCargos();
  }, []);

  const cargarCargos = async () => {
    try {
      const cargosData = await cargoService.getCargosPendientes('tu-id-usuario');
      setCargos(cargosData);
    } catch (error) {
      console.error('Error cargando cargos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="cargos-pendientes">
      <h2>📋 Cargos Pendientes</h2>
      
      {cargos.length === 0 ? (
        <p>No tienes cargos pendientes</p>
      ) : (
        cargos.map((cargo) => (
          <div key={cargo.IdCargoCuenta} className="cargo-item">
            <div className="cargo-info">
              <h4>{cargo.Concepto}</h4>
              <p>Periodo: {cargo.Periodo}</p>
              <p className="monto">${cargo.Valor} COP</p>
            </div>
            <button 
              className="btn-pagar"
              onClick={() => {/* Aquí va el pago */}}
            >
              Pagar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CargosPendientes;