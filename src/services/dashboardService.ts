// src/services/dashboardService.ts
import api from '../api/axios';

export interface DashboardStats {
  correspondenciaPendiente: number;
  visitantesHoy: number;
  entregasHoy: number;
}

export interface ActividadReciente {
  id: string;
  tipo: 'correspondencia' | 'visita';
  titulo: string;
  descripcion: string;
  fecha: string;
  icono: string;
}

export const dashboardService = {
  // Obtener estadísticas REALES con todos los endpoints
  getStats: async (): Promise<DashboardStats> => {
    try {
      const [pendientesRes, visitasRes, correspondenciasRes] = await Promise.all([
        api.get('/api/guarda/correspondencia/pendientes'),
        api.get('/api/guarda/visitas/hoy'), // ← AHORA SÍ EXISTE
        api.get('/api/guarda/correspondencia')
      ]);

      const hoy = new Date().toDateString();
      const entregasHoy = correspondenciasRes.data.filter((c: any) => {
        const fecha = new Date(c.fechaRecepcion);
        return fecha.toDateString() === hoy && c.estado === 'Entregado';
      }).length;

      return {
        correspondenciaPendiente: pendientesRes.data.length,
        visitantesHoy: visitasRes.data.length, // ← DATOS REALES
        entregasHoy: entregasHoy // ← DATOS REALES
      };
    } catch (error) {
      console.error('Error cargando stats:', error);
      return {
        correspondenciaPendiente: 0,
        visitantesHoy: 0,
        entregasHoy: 0
      };
    }
  },

  // Obtener actividad reciente REAL (correspondencia + visitas)
  getActividadReciente: async (): Promise<ActividadReciente[]> => {
    try {
      const [correspondenciasRes, visitasRes] = await Promise.all([
        api.get('/api/guarda/correspondencia?limit=5'),
        api.get('/api/guarda/visitas?limit=5') // ← AHORA SÍ EXISTE
      ]);

      const actividad: ActividadReciente[] = [];

      // Procesar correspondencias
      correspondenciasRes.data.slice(0, 3).forEach((item: any) => {
        actividad.push({
          id: item.idCorrespondencia,
          tipo: 'correspondencia',
          titulo: item.estado === 'Pendiente' ? 'Correspondencia registrada' : 'Correspondencia entregada',
          descripcion: `${item.torre} - ${item.unidad} • ${item.remitente}`,
          fecha: item.fechaRecepcion,
          icono: item.estado === 'Pendiente' ? '📬' : '✅'
        });
      });

      // Procesar visitas
      visitasRes.data.slice(0, 2).forEach((item: any) => {
        actividad.push({
          id: item.idVisita,
          tipo: 'visita',
          titulo: 'Visitante registrado',
          descripcion: `${item.torre} - ${item.unidad} • ${item.nombreVisitante}`,
          fecha: item.fechaRegistro,
          icono: '👤'
        });
      });

      // Ordenar por fecha más reciente y tomar los últimos 3
      return actividad
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        .slice(0, 3);
    } catch (error) {
      console.error('Error cargando actividad:', error);
      return [];
    }
  }
};