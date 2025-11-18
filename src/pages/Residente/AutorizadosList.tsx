import React, { useState, useEffect } from "react";
import { autorizadosService } from "../../services/autorizadosService";


const AutorizadosList: React.FC = () => {
  const [lista, setLista] = useState<any[]>([]);
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    documento: "",
    idTipoDocumento: "",
    idTipoRelacionAutorizado: "",
    telefono: "",
    correoElectronico: "",
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const cargar = async () => {
    setCargando(true);
    try {
      const data = await autorizadosService.listar();
      setLista(data);
    } finally {
      setCargando(false);
    }
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nombre: form.nombre,
      apellidos: form.apellidos,
      numeroDocumento: form.documento,
      idTipoDocumento: Number(form.idTipoDocumento),
      idTipoRelacionAutorizado: Number(form.idTipoRelacionAutorizado),
      telefono: form.telefono || undefined,
      correoElectronico: form.correoElectronico || undefined,
    };

    try {
      if (!editId) {
        await autorizadosService.registrar(payload);
      } else {
        await autorizadosService.actualizar(editId, payload);
        setEditId(null);
      }

      setForm({
        nombre: "",
        apellidos: "",
        documento: "",
        idTipoDocumento: "",
        idTipoRelacionAutorizado: "",
        telefono: "",
        correoElectronico: "",
      });

      cargar();
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Ocurrió un error al guardar el autorizado."
      );
    }
  };

  const eliminar = async (id: string) => {
    if (confirm("¿Eliminar autorizado?")) {
      await autorizadosService.eliminar(id);
      cargar();
    }
  };

  const editar = (a: any) => {
    setEditId(a.id);
    setForm({
      nombre: a.nombre, // si luego quieres separar nombres/apellidos, lo hacemos
      apellidos: "",
      documento: a.documento,
      idTipoDocumento: "",
      idTipoRelacionAutorizado:
        a.idTipoRelacionAutorizado?.toString() || "",
      telefono: "",
      correoElectronico: "",
    });
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="autorizados-page">
      <header className="autorizados-header">
        <div>
          <h1>Personas Autorizadas</h1>
          <p>Administra las personas autorizadas a ingresar a tu unidad.</p>
        </div>
        <button
          className="ghost-button"
          type="button"
          onClick={cargar}
          disabled={cargando}
        >
          {cargando ? "Actualizando..." : "↻ Actualizar lista"}
        </button>
      </header>

      <div className="autorizados-layout">
        {/* Columna del formulario */}
        <section className="card formulario-card">
          <h2>{editId ? "Editar autorizado" : "Nuevo autorizado"}</h2>
          <p className="card-subtitle">
            Diligencia los datos de la persona que quieres autorizar.
          </p>

          <form className="form-grid" onSubmit={guardar}>
            <div className="form-group">
              <label htmlFor="nombre">Nombres</label>
              <input
                id="nombre"
                value={form.nombre}
                onChange={(e) =>
                  setForm({ ...form, nombre: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                value={form.apellidos}
                onChange={(e) =>
                  setForm({ ...form, apellidos: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="documento">Documento</label>
              <input
                id="documento"
                value={form.documento}
                onChange={(e) =>
                  setForm({ ...form, documento: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipoDoc">Tipo de documento</label>
              <select
                id="tipoDoc"
                value={form.idTipoDocumento}
                onChange={(e) =>
                  setForm({ ...form, idTipoDocumento: e.target.value })
                }
                required
              >
                <option value="">Selecciona...</option>
                <option value="1">Cédula</option>
                <option value="2">Pasaporte</option>
                {/* Catálogo real luego */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="relacion">Relación</label>
              <select
                id="relacion"
                value={form.idTipoRelacionAutorizado}
                onChange={(e) =>
                  setForm({
                    ...form,
                    idTipoRelacionAutorizado: e.target.value,
                  })
                }
                required
              >
                <option value="">Selecciona...</option>
                <option value="1">Familiar</option>
                <option value="2">Amigo</option>
                <option value="3">Empleado</option>
                <option value="4">Proveedor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono (opcional)</label>
              <input
                id="telefono"
                value={form.telefono}
                onChange={(e) =>
                  setForm({ ...form, telefono: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="correo">Correo (opcional)</label>
              <input
                id="correo"
                type="email"
                value={form.correoElectronico}
                onChange={(e) =>
                  setForm({
                    ...form,
                    correoElectronico: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-actions">
              {editId && (
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => {
                    setEditId(null);
                    setForm({
                      nombre: "",
                      apellidos: "",
                      documento: "",
                      idTipoDocumento: "",
                      idTipoRelacionAutorizado: "",
                      telefono: "",
                      correoElectronico: "",
                    });
                  }}
                >
                  Cancelar
                </button>
              )}

              <button type="submit" className="primary-button">
                {editId ? "Guardar cambios" : "Agregar autorizado"}
              </button>
            </div>
          </form>
        </section>

        {/* Columna de la tabla */}
        <section className="card tabla-card">
          <div className="tabla-header">
            <h2>Listado</h2>
            <span className="pill">
              {lista.length} autorizado{lista.length !== 1 && "s"}
            </span>
          </div>

          <div className="tabla-wrapper">
            {lista.length === 0 ? (
              <p className="tabla-empty">
                Aún no tienes personas autorizadas. Agrega la primera usando el
                formulario.
              </p>
            ) : (
              <table className="tabla-autorizados">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Relación</th>
                    <th style={{ width: 90 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((a) => (
                    <tr key={a.id}>
                      <td>{a.nombre}</td>
                      <td>{a.documento}</td>
                      <td>{a.relacion}</td>
                      <td className="tabla-actions">
                        <button
                          type="button"
                          className="icon-button"
                          onClick={() => editar(a)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className="icon-button danger"
                          onClick={() => eliminar(a.id)}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
      <style>
        {`
        .autorizados-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 40px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

.autorizados-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.autorizados-header h1 {
  margin: 0;
  font-size: 1.6rem;
}

.autorizados-header p {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.autorizados-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr);
  gap: 20px;
}

.card {
  background: #ffffff;
  border-radius: 14px;
  padding: 18px 18px 20px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
}

.formulario-card h2,
.tabla-card h2 {
  margin: 0;
  font-size: 1.15rem;
}

.card-subtitle {
  margin-top: 4px;
  margin-bottom: 14px;
  font-size: 0.9rem;
  color: #6b7280;
}

.form-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #4b5563;
}

.form-group input,
.form-group select {
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 7px 9px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    background-color 0.15s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.12);
}

.form-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
}

.primary-button {
  border: none;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 0.9rem;
  font-weight: 600;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease;
}

.primary-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.primary-button:active {
  transform: translateY(0);
}

.ghost-button {
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  padding: 7px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  color: #374151;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.ghost-button:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.ghost-button:disabled {
  opacity: 0.6;
  cursor: default;
}

/* Tabla */

.tabla-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 0.75rem;
  font-weight: 600;
}

.tabla-wrapper {
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.tabla-autorizados {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.tabla-autorizados thead {
  background: #f9fafb;
}

.tabla-autorizados th,
.tabla-autorizados td {
  padding: 8px 10px;
  text-align: left;
}

.tabla-autorizados tbody tr:nth-child(even) {
  background: #f9fafb;
}

.tabla-autorizados tbody tr:hover {
  background: #eff6ff;
}

.tabla-actions {
  display: flex;
  gap: 6px;
}

.icon-button {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  padding: 3px 6px;
  border-radius: 6px;
  transition: background 0.15s ease, transform 0.1s ease;
}

.icon-button:hover {
  background: rgba(15, 23, 42, 0.06);
  transform: translateY(-1px);
}

.icon-button.danger:hover {
  background: rgba(220, 38, 38, 0.08);
}

.tabla-empty {
  padding: 14px 12px;
  font-size: 0.9rem;
  color: #6b7280;
}

/* Responsive */

@media (max-width: 900px) {
  .autorizados-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .form-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .autorizados-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

        `}
      </style>
    </div>
  );
};

export default AutorizadosList;
