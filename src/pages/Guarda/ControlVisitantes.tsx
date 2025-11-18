import React, { useState } from "react";

interface Visitante {
  id: string;
  nombre: string;
  documento: string;
  unidad: string;
  motivo: string;
  horaEntrada: string;
  horaSalida?: string;
}

const ControlVisitantes: React.FC = () => {
  const [visitantes, setVisitantes] = useState<Visitante[]>([]);
  const [nuevo, setNuevo] = useState({
    nombre: "",
    documento: "",
    unidad: "",
    motivo: "",
  });

  const registrarEntrada = () => {
    if (!nuevo.nombre || !nuevo.documento || !nuevo.unidad) {
      alert("⚠️ Por favor completa todos los campos obligatorios");
      return;
    }

    const nuevoVisitante: Visitante = {
      id: Date.now().toString(),
      ...nuevo,
      horaEntrada: new Date().toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setVisitantes([nuevoVisitante, ...visitantes]);
    setNuevo({ nombre: "", documento: "", unidad: "", motivo: "" });
    alert("✅ Visitante registrado correctamente");
  };

  const registrarSalida = (id: string) => {
    setVisitantes((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              horaSalida: new Date().toLocaleTimeString("es-CO", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : v
      )
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">👤 Control de Visitantes</h1>
      <p className="mb-6 text-gray-600">
        Registra y gestiona el ingreso de visitantes al conjunto.
      </p>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">📝 Nuevo visitante</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            className="border p-2 rounded"
            placeholder="Nombre completo *"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Documento *"
            value={nuevo.documento}
            onChange={(e) => setNuevo({ ...nuevo, documento: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Unidad / Apto *"
            value={nuevo.unidad}
            onChange={(e) => setNuevo({ ...nuevo, unidad: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Motivo"
            value={nuevo.motivo}
            onChange={(e) => setNuevo({ ...nuevo, motivo: e.target.value })}
          />
        </div>
        <button
          onClick={registrarEntrada}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Registrar Entrada
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">📋 Visitantes en conjunto</h2>
        {visitantes.filter((v) => !v.horaSalida).length === 0 && (
          <p className="text-gray-500">Sin visitantes en este momento.</p>
        )}

        {visitantes
          .filter((v) => !v.horaSalida)
          .map((v) => (
            <div
              key={v.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <strong>{v.nombre}</strong> — {v.unidad} <br />
                <span className="text-sm text-gray-600">
                  Entrada: {v.horaEntrada}
                </span>
              </div>
              <button
                onClick={() => registrarSalida(v.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Registrar Salida
              </button>
            </div>
          ))}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">📜 Historial del Día</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b font-semibold">
              <th>Nombre</th>
              <th>Unidad</th>
              <th>Entrada</th>
              <th>Salida</th>
            </tr>
          </thead>
          <tbody>
            {visitantes.map((v) => (
              <tr key={v.id} className="border-b">
                <td>{v.nombre}</td>
                <td>{v.unidad}</td>
                <td>{v.horaEntrada}</td>
                <td>{v.horaSalida || "En conjunto"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ControlVisitantes;
