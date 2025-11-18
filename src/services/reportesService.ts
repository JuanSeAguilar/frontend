import api from "../api/axios";
import { AxiosError } from "axios";

// Servicio para reportes
export const reportesService = {
  // 📄 1. Descargar reporte de ocupación
  descargarOcupacion: async (): Promise<Blob> => {
    try {
      const response = await api.get("/api/reportes/ocupacion-unidades", {
        responseType: "blob",
      });
      if (response.data.type !== "application/pdf") {
  console.error("El servidor NO devolvió un PDF. Tipo recibido:", response.data.type);

  // Intenta leerlo para ver qué error devolvió el backend
  const texto = await response.data.text();
  console.error("Contenido del error:", texto);

  throw new Error("El servidor no devolvió un PDF. Revisa backend.");
}

return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error en descargarOcupacion:", axiosError);
      console.log("Detalles:", axiosError.response?.data);
      throw error;
    }
  },

  // 🚶‍♂️ 2. Descargar reporte de visitantes
  descargarVisitantes: async (
    desde?: string,
    hasta?: string
  ): Promise<Blob> => {
    try {
      const response = await api.get("/api/reportes/control-visitantes", {
        params: { desde, hasta },
        responseType: "blob",
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error en descargarVisitantes:", axiosError);
      throw error;
    }
  },

  // 📦 3. Descargar reporte de correspondencias
  descargarCorrespondencias: async (
    desde?: string,
    hasta?: string
  ): Promise<Blob> => {
    try {
      const response = await api.get("/api/reportes/correspondencias", {
        params: { desde, hasta },
        responseType: "blob",
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error en descargarCorrespondencias:", axiosError);
      throw error;
    }
  },

  // 👤 4. Descargar reporte de usuarios del sistema
  descargarUsuarios: async (): Promise<Blob> => {
    try {
      const response = await api.get("/api/reportes/usuarios-sistema", {
        responseType: "blob",
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error en descargarUsuarios:", axiosError);
      throw error;
    }
  },
};

// 🔽 Función auxiliar para descargar cualquier PDF Blob
export const descargarPdf = (blob: Blob, nombre: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nombre;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
