import api from "../api/axios";

export const autorizadosService = {
  // 🔹 Obtener todos los autorizados
  async getAll() {
    const { data } = await api.get("/api/Autorizados");
    return data;
  },

  // 🔹 Registrar nuevo autorizado
  async create(autorizado: any) {
    const { data } = await api.post("/api/Autorizados", autorizado);
    return data;
  },

  // 🔹 Actualizar autorizado existente
  async update(id: string, autorizado: any) {
    const { data } = await api.put(`/api/Autorizados/${id}`, autorizado);
    return data;
  },

  // 🔹 Eliminar autorizado
  async delete(id: string) {
    const { data } = await api.delete(`/api/Autorizados/${id}`);
    return data;
  },
};
