import api from '../api/axios';

export const pagoService = {
  getCargosPendientes: async (): Promise<any[]> => {
    const response = await api.get('/api/pago/cargos-pendientes');
    return response.data;
  },
  registrarPago: async (dto: { idCargoCuenta: string; valor: number }): Promise<any> => {
    const response = await api.post('/api/pago', dto);
    return response.data;
  },
  getPagos: async (): Promise<any[]> => {
    const response = await api.get('/api/pago');
    return response.data;
  },
};