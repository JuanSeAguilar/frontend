import React, { useState } from 'react';

const GenerarCargos: React.FC = () => {
  const [formData, setFormData] = useState({
    idUnidad: '',
    periodo: '',
    valor: '',
    concepto: ''
  });

  const handleGenerarCargo = async () => {
    // Aquí llamas a tu servicio para crear el cargo en la BD
    console.log('Generando cargo real:', formData);
    // await residenteService.crearCargo(formData);
  };

  return (
    <div className="generar-cargos">
      <h2>💰 Generar Cargos</h2>
      
      <div className="form-group">
        <label>Unidad:</label>
        <select 
          value={formData.idUnidad} 
          onChange={(e) => setFormData({...formData, idUnidad: e.target.value})}
        >
          <option value="">Seleccionar unidad</option>
          {/* Aquí cargarías las unidades reales de tu BD */}
        </select>
      </div>

      <div className="form-group">
        <label>Periodo (YYYY-MM):</label>
        <input 
          type="text" 
          placeholder="2024-12"
          value={formData.periodo}
          onChange={(e) => setFormData({...formData, periodo: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Valor:</label>
        <input 
          type="number" 
          placeholder="150000"
          value={formData.valor}
          onChange={(e) => setFormData({...formData, valor: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Concepto:</label>
        <input 
          type="text" 
          placeholder="Administración Diciembre 2024"
          value={formData.concepto}
          onChange={(e) => setFormData({...formData, concepto: e.target.value})}
        />
      </div>

      <button onClick={handleGenerarCargo} className="btn-primary">
        Generar Cargo
      </button>
    </div>
  );
};

export default GenerarCargos;