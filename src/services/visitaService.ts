// src/services/visitaService.ts
import api from "../api/axios";

export const visitaService = {
  registrarVisitaByUnidad: async (data: {
    idUnidad: string;
    nombreVisitante: string;
    tipoDocumento: "CC" | "CE" | "NIT" | "PAS";
    numeroDocumento: string;
    motivo: string;
    placaVehiculo?: string | null;
  }) => (await api.post("/api/guarda/visitas/by-unidad", data)).data,

  obtenerVisitas: async () => (await api.get("/api/guarda/visitas")).data,
};
