// src/services/catalogoService.ts
import api from "../api/axios";

export const catalogoService = {
  torres: async () => (await api.get("/api/catalogo/torres")).data as { idTorre:string; nombre:string }[],
  unidadesPorTorre: async (torreId: string) =>
    (await api.get(`/api/catalogo/unidades?torreId=${torreId}`)).data as { idUnidad:string; codigo:string }[],
};
