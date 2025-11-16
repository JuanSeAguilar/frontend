import api from "../api/axios";

export interface Residente {
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  numeroDocumento: string;
  idTipoDocumento: string;
  idUnidad: string;
  contrasena?: string; // ✅ opcional en UI, pero requerido por backend
  idRol?: number;      // ✅ rol del residente
}

export const residenteService = {
   getAll: async (): Promise<Residente[]> => {
    const { data } = await api.get("/Residente");
    return data;
  },
  create: async (residente: Residente): Promise<void> => {
    const payload = {
      ...residente,
      idTipoDocumento: Number(residente.idTipoDocumento),
      idRol: residente.idRol ?? 2, // 👈 suponemos que el rol 3 es "Residente"
      contrasena: residente.contrasena ?? "123456", // 👈 valor por defecto
    };

    const response = await api.post("/api/registro/residente", payload);
    return response.data;
  },
};
