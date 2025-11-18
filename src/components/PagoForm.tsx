import React, { useState } from 'react';
import '../styles/PagoForm.css';
import { pagoService } from '../services/pagoService';

interface PagoFormProps {
  idCargoCuenta: string;
  monto: number;
  concepto: string;
  periodo: string;
  onPagoExitoso: () => void;
  onCancelar: () => void;
}

const PagoForm: React.FC<PagoFormProps> = ({ 
  idCargoCuenta,
  monto, 
  concepto, 
  periodo,
  onPagoExitoso, 
  onCancelar 
}) => {
  
  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvc: '',
    nombreTitular: '',
  });

  const [procesando, setProcesando] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let valorFormateado = value;

    if (name === 'numeroTarjeta') {
      valorFormateado = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (valorFormateado.length > 19) valorFormateado = valorFormateado.slice(0, 19);
    }

    if (name === 'fechaExpiracion') {
      valorFormateado = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (valorFormateado.length > 5) valorFormateado = valorFormateado.slice(0, 5);
    }

    if (name === 'cvc') {
      valorFormateado = value.replace(/\D/g, '').slice(0, 4);
    }

    setDatosPago(prev => ({
      ...prev,
      [name]: valorFormateado
    }));

    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};

    if (!datosPago.numeroTarjeta || datosPago.numeroTarjeta.replace(/\s/g, '').length < 13) {
      nuevosErrores.numeroTarjeta = 'Número de tarjeta inválido';
    }

    if (!datosPago.fechaExpiracion || !/^\d{2}\/\d{2}$/.test(datosPago.fechaExpiracion)) {
      nuevosErrores.fechaExpiracion = 'Fecha inválida (MM/YY)';
    }

    if (!datosPago.cvc || datosPago.cvc.length < 3) {
      nuevosErrores.cvc = 'CVC inválido';
    }

    if (!datosPago.nombreTitular.trim()) {
      nuevosErrores.nombreTitular = 'Nombre del titular requerido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const procesarPago = async () => {
    if (!validarFormulario()) return;

    setProcesando(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const exito = true; // simulamos 100% éxito real
      const transaccion = {
        id: `tx_${Date.now()}`,
        exito,
        banco: 'Bancolombia',
        codigoAutorizacion: `AUTH${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        fecha: new Date().toISOString()
      };

      setResultado(transaccion);

      if (exito) {
        try {
          await pagoService.registrarPago({
            idCargoCuenta,
            valor: monto
          });

          console.log("Pago registrado en BD correctamente ✔");
        } catch (apiError: any) {
          console.error("❌ Error registrando pago:", apiError);

          alert("El pago fue exitoso, pero hubo un error registrándolo en la BD.");
        }

        setTimeout(() => {
          onPagoExitoso();
        }, 2500);
      }

    } catch (err) {
      setResultado({
        exito: false,
        mensajeError: 'Error inesperado procesando el pago'
      });
    } finally {
      setProcesando(false);
    }
  };

  if (procesando) {
    return (
      <div className="pago-form-container">
        <div className="pago-procesando">
          <div className="spinner"></div>
          <h3>Procesando pago...</h3>
          <p>Estamos comunicándonos con tu banco</p>
        </div>
      </div>
    );
  }

  if (resultado) {
    return (
      <div className="pago-form-container">
        <div className={`resultado-pago ${resultado.exito ? 'exito' : 'error'}`}>
          <div className="icono-resultado">
            {resultado.exito ? '✅' : '❌'}
          </div>

          <h3>{resultado.exito ? '¡Pago Exitoso!' : 'Pago Fallido'}</h3>

          {resultado.exito ? (
            <>
              <p>Tu pago ha sido procesado correctamente</p>

              <div className="detalles-transaccion">
                <div className="detalle"><span>Concepto:</span>{concepto}</div>
                <div className="detalle"><span>Periodo:</span>{periodo}</div>
                <div className="detalle"><span>Monto:</span>${monto} COP</div>
                <div className="detalle"><span>Banco:</span>{resultado.banco}</div>
                <div className="detalle"><span>Autorización:</span>{resultado.codigoAutorizacion}</div>
              </div>

              <p>Redirigiendo...</p>
            </>
          ) : (
            <>
              <p className="error-text">{resultado.mensajeError}</p>
              <button onClick={() => setResultado(null)} className="btn-secundario">
                Intentar nuevamente
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pago-form-container">
      <div className="pago-header">
        <h2>Pago de Servicios</h2>
        <div className="monto-total">
          Total a pagar: <span>${monto} COP</span>
        </div>
        <p>{concepto} - {periodo}</p>
      </div>

      <form className="pago-form" onSubmit={(e) => { e.preventDefault(); procesarPago(); }}>
        
        <div className="form-group">
          <label>Número de Tarjeta</label>
          <input
            type="text"
            name="numeroTarjeta"
            value={datosPago.numeroTarjeta}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            className={errores.numeroTarjeta ? 'error' : ''}
          />
          {errores.numeroTarjeta && <div className="error-text">{errores.numeroTarjeta}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha Expiración</label>
            <input
              type="text"
              name="fechaExpiracion"
              value={datosPago.fechaExpiracion}
              onChange={handleInputChange}
              placeholder="MM/YY"
              className={errores.fechaExpiracion ? 'error' : ''}
            />
            {errores.fechaExpiracion && <div className="error-text">{errores.fechaExpiracion}</div>}
          </div>

          <div className="form-group">
            <label>CVC</label>
            <input
              type="text"
              name="cvc"
              value={datosPago.cvc}
              onChange={handleInputChange}
              placeholder="123"
              className={errores.cvc ? 'error' : ''}
            />
            {errores.cvc && <div className="error-text">{errores.cvc}</div>}
          </div>
        </div>

        <div className="form-group">
          <label>Nombre del Titular</label>
          <input
            type="text"
            name="nombreTitular"
            value={datosPago.nombreTitular}
            onChange={handleInputChange}
            placeholder="Como aparece en la tarjeta"
            className={errores.nombreTitular ? 'error' : ''}
          />
          {errores.nombreTitular && <div className="error-text">{errores.nombreTitular}</div>}
        </div>

        <button type="submit" className="btn-pagar" disabled={procesando}>
          Pagar ${monto} COP
        </button>

        <button type="button" onClick={onCancelar} className="btn-secundario" disabled={procesando}>
          Cancelar
        </button>

        <div className="seguridad-info">
          🔒 Transacción segura
        </div>
      </form>
    </div>
  );
};

export default PagoForm;
