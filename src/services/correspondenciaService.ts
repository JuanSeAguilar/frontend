// src/services/correspondenciaService.ts
import api from "../api/axios";

export const correspondenciaService = {
  // RESIDENTE
  obtenerPorResidente: async (soloPendiente?: boolean) =>
    (
      await api.get("/api/residente/correspondencia", {
        params: { soloPendiente },
      })
    ).data,

  // GUARDA – registro
  registrar: async (dto: {
    idUnidad: string;
    idTipoCorrespondencia: number;
    remitente?: string;
    observacion?: string;
  }) => (await api.post("/api/guarda/correspondencia", dto)).data,

  // GUARDA – unidades para el select
  getUnidades: async () =>
    (await api.get("/api/guarda/correspondencia/unidades")).data,

  // GUARDA – tipos de correspondencia para el select
  getTipos: async () =>
    (await api.get("/api/guarda/correspondencia/tiposCorrespondencia")).data,

  // GUARDA – pendientes para el dashboard
  getPendientes: async () =>
    (await api.get("/api/guarda/correspondencia/pendientes")).data,

  // GUARDA – notificar al residente
  notificar: async (id: string) =>
    (await api.put(`/api/guarda/correspondencia/${id}/notificar`)).data,
};
