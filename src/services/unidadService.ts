import api from "../api/axios";

export interface Torre {
  idTorre: string;
  nombre: string;
}

export interface Unidad {
  idUnidad: string;
  codigo: string;
}

export interface Residente {
  idUsuario: string;
  nombre: string;
  email: string;
  telefono: string;
  fechaInicio: string;
}

export interface UnidadDetalle {
  idUnidad: string;
  codigo: string;
  piso?: number;
  areaNM2?: number;
  residente: Residente | null;
}

export interface UnidadConDetalles {
  id: string;
  torre: string;
  numero: string;
  residente: string;
  telefono: string;
  email: string;
  estado: "Ocupado" | "Desocupado" | "Mantenimiento";
}

// Obtener todas las torres
export const fetchTorres = async (): Promise<Torre[]> => {
  try {
    const response = await api.get('/api/catalogo/torres');
    return response.data;
  } catch (error) {
    console.error('Error al obtener torres:', error);
    throw error;
  }
};

// Obtener unidades por torre (básico)
export const fetchUnidadesByTorre = async (torreId: string): Promise<Unidad[]> => {
  try {
    if (!torreId) {
      throw new Error('torreId es requerido');
    }
    const response = await api.get('/api/catalogo/unidades', {
      params: { torreId },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener unidades:', error);
    throw error;
  }
};

// Obtener unidades con detalles del residente
export const fetchUnidadesDetallesByTorre = async (torreId: string): Promise<UnidadDetalle[]> => {
  try {
    if (!torreId) {
      throw new Error('torreId es requerido');
    }
    const response = await api.get('/api/catalogo/unidades-detalles', {
      params: { torreId },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener unidades con detalles:', error);
    throw error;
  }
};

// Obtener todas las unidades con detalles
export const fetchAllUnidadesWithDetails = async (): Promise<UnidadConDetalles[]> => {
  try {
    const response = await api.get('/api/catalogo/unidades-detalles');
    return response.data;
  } catch (error) {
    console.error('Error al obtener unidades con detalles:', error);
    throw error;
  }
};