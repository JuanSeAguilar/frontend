import api from "../api/axios";

export interface Residente {
  idResidente?: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  numeroDocumento: string;
  idTipoDocumento: string;
  torre: string;
  unidad: string;
}

export const residenteService = {
  // ✅ Obtener todos los residentes
  getAll: async (): Promise<Residente[]> => {
    const { data } = await api.get("/Residente");
    return data;
  },

  // ✅ Crear residente
  create: async (residente: Residente): Promise<void> => {
    await api.post("/Registro/residente", residente);
  },

  // ✅ Eliminar residente
  delete: async (id: number): Promise<void> => {
    await api.delete(`/Residente/${id}`);
  },
};
