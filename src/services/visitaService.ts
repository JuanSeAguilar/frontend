import api from "../api/axios";

export const visitaService = {
  // Registrar una nueva visita
  registrarVisita: async (data: any) => {
    const res = await api.post("/api/visitas/registrar", data);
    return res.data;
  },

  // Obtener todas las visitas registradas (para el guarda)
  obtenerVisitas: async () => {
    const res = await api.get("/api/visitas");
    return res.data;
  },

  // (opcional) Marcar salida de una visita
  registrarSalida: async (id: number) => {
    const res = await api.put(`/api/visitas/${id}/salida`);
    return res.data;
  }
};
