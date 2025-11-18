import api from "../api/axios";

export interface Usuario {
  idUsuario?: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  numeroDocumento: string;
  idTipoDocumento: string;
  idRol: string;
  contrasena?: string;
}

export const usuarioService = {
  // ✅ Obtener todos los usuarios
  getAll: async (): Promise<Usuario[]> => {
    const { data } = await api.get("/Usuario");
    return data;
  },

  // ✅ Crear usuario (usa el endpoint del backend que tienes)
  create: async (usuario: Usuario): Promise<void> => {
    await api.post("api/Registro/usuario", usuario);
  },

  // ✅ Eliminar usuario por ID
  delete: async (id: number): Promise<void> => {
    await api.delete(`/Usuario/${id}`);
  },
};
