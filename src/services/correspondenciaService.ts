// src/services/correspondenciaService.ts
import api from '../api/axios.ts';

// Tipos (se mantienen igual)
export interface TipoCorrespondencia {
  idTipoCorrespondencia: number;
  nombre: string;
}

export interface Unidad {
  idUnidad: string;
  nombreCompleto: string;
}

export interface Correspondencia {
  idCorrespondencia: string;
  torreNombre: string;
  unidadCodigo: string;
  tipoCorrespondencia: string;
  remitente: string;
  observacion: string;
  fechaRecepcion: string;
  usuarioRegistro: string;
  estado: string;
}

export interface CorrespondenciaFormData {
  idUnidad: string;
  idTipoCorrespondencia: number;
  remitente: string;
  observacion: string;
}

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
  }
};

export default correspondenciaService;