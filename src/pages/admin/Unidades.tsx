import React, { useState } from "react";

interface Unidad {
  id: string;
  torre: string;
  numero: string;
  residente: string;
  telefono: string;
  email: string;
  estado: "Ocupado" | "Desocupado" | "Mantenimiento";
}

const Unidades: React.FC = () => {
  const [unidades] = useState<Unidad[]>([
    { id: "1", torre: "A", numero: "101", residente: "Carlos Ruiz", telefono: "3001234567", email: "carlos@email.com", estado: "Ocupado" },
    { id: "2", torre: "A", numero: "102", residente: "", telefono: "", email: "", estado: "Desocupado" },
    { id: "3", torre: "B", numero: "201", residente: "Ana Gómez", telefono: "3009876543", email: "ana@email.com", estado: "Mantenimiento" },
  ]);

  const colorEstado = (estado: string) => {
    switch (estado) {
      case "Ocupado": return "bg-green-500";
      case "Desocupado": return "bg-gray-400";
      case "Mantenimiento": return "bg-yellow-400";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🏘️ Gestión de Unidades</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {unidades.map((u) => (
          <div key={u.id} className="bg-white shadow rounded-lg p-4 border">
            <h2 className="text-xl font-semibold mb-2">
              Torre {u.torre} - {u.numero}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {u.residente ? `👤 ${u.residente}` : "🏠 Vacante"}
            </p>
            <span
              className={`inline-block px-2 py-1 text-white text-xs rounded ${colorEstado(
                u.estado
              )}`}
            >
              {u.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Unidades;
