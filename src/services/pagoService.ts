import api from "../api/axios";

export interface Pago {
  idPago: string;
  idCargoCuenta: string;
  residente?: string;
  unidad?: string;
  periodo?: string;
  valor: number;
  metodoPago?: string;
  fechaPago: string;
  fechaRegistro?: string;
}


export interface RegistrarPagoRequest {
  idCargoCuenta: string;
  valor: number;
}
export const pagoService = {
  // Obtener todos los pagos (admin)
  getPagos: async (): Promise<Pago[]> => {
    try {
      const response = await api.get('/api/pago');
      return response.data;
    } catch (error) {
      console.error('Error al obtener pagos:', error);
      throw error;
    }
  },

  // Obtener cargos pendientes (residente)
  getCargosPendientes: async (): Promise<any[]> => {
    try {
      const response = await api.get('/api/pago/cargos-pendientes');
      return response.data;
    } catch (error) {
      console.error('Error al obtener cargos pendientes:', error);
      throw error;
    }
  },

  // Registrar un pago
  registrarPago: async (data: RegistrarPagoRequest): Promise<any> => {
    try {
      const response = await api.post('/api/pago', {
        idCargoCuenta: data.idCargoCuenta,
        valor: data.valor,
      });
      return response.data;
    } catch (error) {
      console.error('Error al registrar pago:', error);
      throw error;
    }
  },
};