// src/services/correspondenciaService.ts
<<<<<<< Updated upstream
import api from '../api/axios.ts';

// Tipos (se mantienen igual)
export interface TipoCorrespondencia {
  idTipoCorrespondencia: number;
  nombre: string;
=======
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5170/api';

export interface Correspondencia {
  
  idCorrespondencia: string;
  torre: string;           // ← Viene del backend como "torre"
  unidad: string;          // ← Viene del backend como "unidad" 
  tipoCorrespondencia: string;
  remitente: string;
  observacion?: string;
  fechaRecepcion: string;
  estado: string;
  fechaEntregado?: string;
  entregadoA?: string;
  registradoPor: string;
>>>>>>> Stashed changes
}

export interface Unidad {
  idUnidad: string;
  nombreCompleto: string;
}

export interface TipoCorrespondencia {
  idTipoCorrespondencia: number;
  nombre: string;
}

export interface RegistrarCorrespondenciaDto {
  idUnidad: string;
  idTipoCorrespondencia: number;
  remitente: string;
  observacion: string;
}

<<<<<<< Updated upstream
// Servicio REAL con tu API
export const correspondenciaService = {
  // Obtener tipos de correspondencia (REAL)
  getTipos: async (): Promise<TipoCorrespondencia[]> => {
    const response = await api.get('/api/guarda/correspondencia/tiposCorrespondencia');
    return response.data;
  },

  // Obtener unidades (REAL)
  getUnidades: async (): Promise<Unidad[]> => {
    const response = await api.get('/api/guarda/correspondencia/unidades');
    return response.data;
  },

  // Crear correspondencia (REAL)
  crear: async (data: CorrespondenciaFormData): Promise<{id: string, message: string}> => {
    const response = await api.post('/api/guarda/correspondencia', data);
    return response.data;
  },

  // Obtener correspondencias (REAL)
  getCorrespondencias: async (): Promise<Correspondencia[]> => {
    const response = await api.get('/api/guarda/correspondencia');
    return response.data;
  },

  // Obtener pendientes (REAL)
  getPendientes: async (): Promise<any[]> => {  // ← usa any[] temporalmente
  const response = await api.get('/api/guarda/correspondencia/pendientes');
  console.log('📦 Datos de pendientes:', response.data); // ← para ver qué viene
  return response.data;
},

  // Notificar correspondencia (REAL)
  notificar: async (id: string): Promise<{message: string}> => {
    const response = await api.put(`/api/guarda/correspondencia/${id}/notificar`);
    return response.data;
  },

  // Entregar correspondencia (REAL)
  entregar: async (id: string, entregadoA: string): Promise<{message: string}> => {
    const response = await api.put(`/api/guarda/correspondencia/${id}/entregar`, {
      entregadoA: entregadoA
    });
    return response.data;
  },

  // Eliminar correspondencia (SI EXISTE EL ENDPOINT)
  eliminar: async (id: string): Promise<void> => {
    // Si no tienes endpoint de eliminar, quita esto
    await api.delete(`/api/guarda/correspondencia/${id}`);
=======
export interface EntregarDto {
  entregadoA: string;
}

class CorrespondenciaService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`
    };
  }

  async obtenerCorrespondencias(): Promise<Correspondencia[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/guarda/correspondencia`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo correspondencias:', error);
      throw error;
    }
  }

  async obtenerPendientes(): Promise<Correspondencia[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/guarda/correspondencia/pendientes`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo pendientes:', error);
      throw error;
    }
  }

  async registrarCorrespondencia(datos: RegistrarCorrespondenciaDto): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/guarda/correspondencia`, datos, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.error('Error registrando correspondencia:', error);
      throw error;
    }
  }

  async notificarCorrespondencia(id: string): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/guarda/correspondencia/${id}/notificar`, {}, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.error('Error notificando correspondencia:', error);
      throw error;
    }
  }

  async entregarCorrespondencia(id: string, datos: EntregarDto): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/guarda/correspondencia/${id}/entregar`, datos, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.error('Error entregando correspondencia:', error);
      throw error;
    }
  }

  async obtenerUnidades(): Promise<Unidad[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/unidades`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo unidades:', error);
      return this.obtenerUnidadesMock();
    }
  }

  async obtenerTiposCorrespondencia(): Promise<TipoCorrespondencia[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/tipos-correspondencia`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos:', error);
      return this.obtenerTiposMock();
    }
  }

  private obtenerUnidadesMock(): Unidad[] {
    return [
      { idUnidad: '123e4567-e89b-12d3-a456-426614174000', codigoCompleto: 'Torre A - 101', torreNombre: 'Torre A' },
      { idUnidad: '123e4567-e89b-12d3-a456-426614174001', codigoCompleto: 'Torre A - 102', torreNombre: 'Torre A' },
    ];
>>>>>>> Stashed changes
  }

  private obtenerTiposMock(): TipoCorrespondencia[] {
    return [
      { idTipoCorrespondencia: 1, nombre: 'Carta' },
      { idTipoCorrespondencia: 2, nombre: 'Paquete' },
      { idTipoCorrespondencia: 3, nombre: 'Documento' },
    ];
  }
}

export const correspondenciaService = new CorrespondenciaService();