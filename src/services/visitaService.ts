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

  // ✅ Nuevo método: abrir reporte en nueva pestaña
  generarReporte: async () => {
    const res = await api.get("/api/reportes/reporte-visitas", {
      responseType: "blob", // Importante: recibimos el PDF como binario
    });

    // Crear blob y URL temporal
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Abre el PDF en una nueva pestaña
    window.open(url, "_blank");

    // Limpieza opcional (después de unos segundos)
    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
  },
};
