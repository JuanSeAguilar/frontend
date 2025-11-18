import api from "../api/axios";

type RegistrarAutorizadoDto = {
  nombre: string;
  apellidos: string;
  numeroDocumento: string;
  idTipoDocumento: number;
  idTipoRelacionAutorizado: number;
  telefono?: string;
  correoElectronico?: string;
};

export const autorizadosService = {
  listar: async () =>
    (await api.get("/api/residente/autorizados")).data,

  registrar: async (dto: RegistrarAutorizadoDto) =>
    (await api.post("/api/residente/autorizados", dto)).data,

  actualizar: async (id: string, dto: RegistrarAutorizadoDto) =>
    (await api.put(`/api/residente/autorizados/${id}`, dto)).data,

  eliminar: async (id: string) =>
    (await api.delete(`/api/residente/autorizados/${id}`)).data,

  validar: async (documento: string) =>
    (await api.get(`/api/guarda/autorizados/validar?documento=${documento}`)).data,
};
