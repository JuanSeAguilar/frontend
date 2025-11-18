import React, { useState } from "react";
import { autorizadosService } from "../../services/autorizadosService";

type ResultadoValidacion = {
  autorizado: boolean;
  coincidencias?: {
    nombreAutorizado: string;
    relacion: string;
    residente: string;
    unidad: string | null;
  }[];
};

export default function ValidarAutorizado() {
  const [doc, setDoc] = useState("");
  const [resultado, setResultado] = useState<ResultadoValidacion | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validar = async () => {
    const documento = doc.trim();
    setError(null);
    setResultado(null);

    if (!documento) {
      setError("Ingresa un documento para validar.");
      return;
    }

    try {
      setCargando(true);
      const res = await autorizadosService.validar(documento);
      setResultado(res);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Ocurrió un error al validar el autorizado."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="validar-page">
      <div className="validar-card">
        <h2>🔎 Validación de Autorizado</h2>
        <p>Consulta si una persona está autorizada y quién la autorizó.</p>

        <div className="validar-form">
          <div style={{ flex: 1 }}>
            <label
              htmlFor="doc"
              style={{
                fontSize: "0.8rem",
                display: "block",
                marginBottom: 4,
              }}
            >
              Documento
            </label>
            <input
              id="doc"
              placeholder="Número de documento"
              value={doc}
              onChange={(e) => setDoc(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && validar()}
            />
          </div>
          <button onClick={validar} disabled={cargando}>
            {cargando ? "Validando..." : "Validar"}
          </button>
        </div>

        {error && <p className="validar-error">{error}</p>}

        {resultado && !error && (
          <div className="validar-result">
            {resultado.autorizado ? (
              <div className="validar-ok">
                <span className="badge badge-ok">Autorizado</span>

                {/* Mostramos las coincidencias (puede ser más de una) */}
                {resultado.coincidencias?.map((c, idx) => (
                  <div key={idx} className="validar-item">
                    <p className="nombre">{c.nombreAutorizado}</p>
                    <p className="relacion">
                      Relación: <b>{c.relacion}</b>
                    </p>
                    <p className="residente">
                      Autorizado por: <b>{c.residente}</b>
                    </p>
                    <p className="unidad">
                      Unidad: <b>{c.unidad ?? "Sin unidad activa"}</b>
                    </p>
                    {idx < (resultado.coincidencias?.length ?? 0) - 1 && (
                      <hr />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="validar-bad">
                <span className="badge badge-bad">No autorizado</span>
                <p>Esta persona no se encuentra registrada como autorizada.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <style> 
        {`
        .validar-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: #f3f4f6;
}

.validar-card {
  max-width: 420px;
  width: 100%;
  background: white;
  border-radius: 18px;
  padding: 22px 20px 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
  border: 1px solid #e5e7eb;
  text-align: left;
}

.validar-card h2 {
  margin: 0 0 4px;
  font-size: 1.3rem;
}

.validar-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.validar-form {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.validar-form input {
  flex: 1;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  padding: 8px 10px;
  font-size: 0.9rem;
}

.validar-form button {
  border-radius: 999px;
  border: none;
  padding: 8px 14px;
  font-size: 0.9rem;
  font-weight: 600;
  background: #10b981;
  color: white;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease;
}

.validar-form button:hover {
  background: #059669;
  transform: translateY(-1px);
}

.validar-form button:disabled {
  opacity: 0.6;
  transform: none;
  cursor: default;
}

.validar-error {
  margin-top: 10px;
  color: #b91c1c;
  font-size: 0.85rem;
}

.validar-result {
  margin-top: 18px;
}

.badge {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-ok {
  background: #dcfce7;
  color: #166534;
}

.badge-bad {
  background: #fee2e2;
  color: #b91c1c;
}

.validar-ok .nombre {
  margin: 8px 0 2px;
  font-weight: 600;
  color: #111827;
}

.validar-ok .relacion {
  margin: 0;
  color: #4b5563;
  font-size: 0.9rem;
}

.validar-bad p {
  margin-top: 8px;
  color: #4b5563;
  font-size: 0.9rem;
}

        `} 
      </style>
    </div>
  );
}
