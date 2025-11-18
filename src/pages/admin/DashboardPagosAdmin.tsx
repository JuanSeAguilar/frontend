import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../styles/DashboardPagosAdmin.module.css';
import { pagoService } from '../../services/pagoService';

interface Pago {
  idPago: string;
  residente?: string;
  unidad?: string;
  periodo?: string;
  valor: number;
  metodoPago?: string;
  fechaPago: string;
}

const currency = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'COP', // Ajusta a tu moneda: 'COP', 'EUR', etc.
  minimumFractionDigits: 0,
});

const DashboardPagosAdmin: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetchPagos = async () => {
      try {
        setLoading(true);
        const data = await pagoService.getPagos();
        if (!mounted) return;
        setPagos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al cargar pagos:', error);
        if (mounted) setPagos([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchPagos();
    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pagos;
    return pagos.filter((p) =>
      [p.residente, p.unidad, p.periodo, p.metodoPago]
        .filter(Boolean)
        .some((val) => (val as string).toLowerCase().includes(q))
    );
  }, [pagos, query]);

  const totalValor = useMemo(
    () => filtered.reduce((s, p) => s + (Number(p.valor) || 0), 0),
    [filtered]
  );

  const onRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Dashboard de Pagos</h2>
          <p className={styles.subtitle}>
            Pagos registrados ({pagos.length}) — Mostrando {filtered.length}
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <input
              className={styles.search}
              placeholder="Buscar por residente, unidad o periodo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar pagos"
            />
          </div>
          <button className={styles.button} onClick={onRefresh} title="Refrescar">
            ↻ Refrescar
          </button>
        </div>
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <span>Cargando pagos...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No hay pagos que coincidan con la búsqueda.</p>
          </div>
        ) : (
          <>
            <div className={styles.summary}>
              <div>Total visible:</div>
              <div className={styles.totalValue}>{currency.format(totalValor)}</div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Residente</th>
                    <th>Unidad</th>
                    <th>Período</th>
                    <th>Valor</th>
                    <th>Método</th>
                    <th>Fecha de pago</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.idPago}>
                      <td className={styles.residente}>{p.residente ?? '—'}</td>
                      <td>{p.unidad ?? '—'}</td>
                      <td>{p.periodo ?? '—'}</td>
                      <td className={styles.valor}>{currency.format(p.valor)}</td>
                      <td>{p.metodoPago ?? '—'}</td>
                      <td>{new Date(p.fechaPago).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPagosAdmin;