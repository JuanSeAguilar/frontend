import React, { useEffect, useState } from 'react';
import { pagoService } from '../../services/pagoService'; // Cambia '../services/pagoService' por '../../services/pagoService'


interface Pago {
  idPago: string;
  residente: string;
  unidad: string;
  periodo: string;
  valor: number;
  metodo: string;
  fechaPago: string;
}

const DashboardPagosAdmin: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const data = await pagoService.getPagos();
        setPagos(data);
      } catch (error) {
        console.error('Error al cargar pagos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPagos();
  }, []);

  if (loading) return <div>Cargando pagos...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard de Pagos - Administrador</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Residente</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Unidad</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Período</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Valor</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Método</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fecha de Pago</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.idPago}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pago.residente}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pago.unidad}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pago.periodo}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>${pago.valor}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pago.metodo}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{new Date(pago.fechaPago).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pagos.length === 0 && <p>No hay pagos registrados aún.</p>}
    </div>
  );
};

export default DashboardPagosAdmin;