// src/services/correspondenciaService.ts
import axios from 'axios';
const API_BASE_URL = 'http://localhost:5170/api'; // ← PUERTO CORRECTO
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


  private obtenerTiposMock(): TipoCorrespondencia[] {
    return [
      { idTipoCorrespondencia: 1, nombre: 'Carta' },
      { idTipoCorrespondencia: 2, nombre: 'Paquete' },
      { idTipoCorrespondencia: 3, nombre: 'Documento' },
    ];
  }
}

export const correspondenciaService = new CorrespondenciaService();