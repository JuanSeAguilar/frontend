// services/cargoService.ts
import api from '../api/axios';

export const cargoService = {
  async getCargosPendientes(idUsuario: string) {
    const response = await api.get(`/api/Residente/${idUsuario}/cargos-pendientes`);
    return response.data;
  }
};