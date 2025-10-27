// src/services/correspondenciaService.ts

// Tipos
export interface TipoCorrespondencia {
  idTipoCorrespondencia: number;
  nombre: string;
}

export interface Unidad {
  idUnidad: string;
  codigoCompleto: string;
  torreNombre: string;
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

// Servicio mock (sin backend)
export const correspondenciaService = {
  // Obtener tipos de correspondencia
  getTipos: async (): Promise<TipoCorrespondencia[]> => {
    return [
      { idTipoCorrespondencia: 1, nombre: 'Paquete' },
      { idTipoCorrespondencia: 2, nombre: 'Documento' },
      { idTipoCorrespondencia: 3, nombre: 'Encomienda' },
      { idTipoCorrespondencia: 4, nombre: 'Carta' }
    ];
  },

  // Obtener unidades
  getUnidades: async (): Promise<Unidad[]> => {
    return [
      { idUnidad: '123e4567-e89b-12d3-a456-426614174000', codigoCompleto: 'Torre A - 101', torreNombre: 'Torre A' },
      { idUnidad: '123e4567-e89b-12d3-a456-426614174001', codigoCompleto: 'Torre A - 102', torreNombre: 'Torre A' },
      { idUnidad: '123e4567-e89b-12d3-a456-426614174002', codigoCompleto: 'Torre B - 201', torreNombre: 'Torre B' },
      { idUnidad: '123e4567-e89b-12d3-a456-426614174003', codigoCompleto: 'Torre B - 202', torreNombre: 'Torre B' },
      { idUnidad: '123e4567-e89b-12d3-a456-426614174004', codigoCompleto: 'Torre C - 301', torreNombre: 'Torre C' }
    ];
  },

  // Crear correspondencia
  crear: async (data: CorrespondenciaFormData): Promise<void> => {
    console.log('📦 Creando correspondencia:', data);
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    // En una app real, aquí iría la llamada a la API
  },

  // Obtener correspondencias
  getCorrespondencias: async (filtroEstado?: string): Promise<Correspondencia[]> => {
    const correspondencias: Correspondencia[] = [
      {
        idCorrespondencia: '1',
        torreNombre: 'Torre A',
        unidadCodigo: '101',
        tipoCorrespondencia: 'Paquete',
        remitente: 'Servientrega',
        observacion: 'Paquete mediano',
        fechaRecepcion: '2024-01-15T10:00:00Z',
        usuarioRegistro: 'Admin',
        estado: 'Pendiente'
      },
      {
        idCorrespondencia: '2',
        torreNombre: 'Torre B',
        unidadCodigo: '205',
        tipoCorrespondencia: 'Documento',
        remitente: 'DHL',
        observacion: 'Sobre manila',
        fechaRecepcion: '2024-01-15T11:30:00Z',
        usuarioRegistro: 'Admin',
        estado: 'Notificado'
      }
    ];

    if (filtroEstado) {
      return correspondencias.filter(c => c.estado === filtroEstado);
    }

    return correspondencias;
  },

  // Notificar correspondencia
  notificar: async (id: string): Promise<void> => {
    console.log('📢 Notificando correspondencia:', id);
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  // Entregar correspondencia
  entregar: async (id: string, entregadoA: string): Promise<void> => {
    console.log('✅ Entregando correspondencia:', id, 'a:', entregadoA);
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  // Eliminar correspondencia
  eliminar: async (id: string): Promise<void> => {
    console.log('🗑️ Eliminando correspondencia:', id);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

export default correspondenciaService;