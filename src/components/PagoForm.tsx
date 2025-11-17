import React, { useState } from 'react';
import '../styles/PagoForm.css';
import { pagoService } from '../services/pagoService'; // Importa el servicio real

interface PagoFormProps {
  idCargoCuenta: string; // Agregado: ID del cargo a pagar
  monto: number;
  concepto: string;
  periodo: string;
  onPagoExitoso: () => void;
  onCancelar: () => void;
}

const PagoForm: React.FC<PagoFormProps> = ({ 
  idCargoCuenta, // Nuevo prop
  monto = 150000, 
  concepto = "Administración", 
  periodo = "2025-01",
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
      // Simular procesamiento de tarjeta (como antes)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const exito = Math.random() > 0.1; // 90% éxito
      
      const transaccionSimulada = {
        id: `tx_${Date.now()}`,
        exito,
        banco: ['Bancolombia', 'Davivienda', 'BBVA'][Math.floor(Math.random() * 3)],
        codigoAutorizacion: exito ? `AUTH${Math.random().toString(36).substr(2, 8).toUpperCase()}` : undefined,
        mensajeError: exito ? undefined : 'Fondos insuficientes',
        fecha: new Date().toISOString()
      };
      
      setResultado(transaccionSimulada);

      if (exito) {
        // **NUEVO: Registrar el pago en la BD después del éxito**
        try {
          await pagoService.registrarPago({
            idCargoCuenta: idCargoCuenta, // Usa el ID del cargo
            valor: monto
          });
          console.log('✅ Pago registrado en la BD');
        } catch (apiError) {
          console.error('❌ Error registrando pago en BD:', apiError);
          // Opcional: Mostrar error al usuario, pero no bloquear el flujo
          alert('Pago simulado exitoso, pero error al registrar en BD. Contacta soporte.');
        }

        setTimeout(() => {
          onPagoExitoso(); // Llama al callback de éxito
        }, 3000);
      }
      
    } catch (error) {
      setResultado({
        exito: false,
        mensajeError: 'Error en el procesamiento'
      });
    } finally {
      setProcesando(false);
    }
  };

  // El resto del código (render) permanece igual...
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
          
          <h3>{resultado.exito ? '¡Pago Exitoso!' : 'Error en el Pago'}</h3>
          
          {resultado.exito ? (
            <>
              <p>Tu pago ha sido procesado correctamente</p>
              
              <div className="detalles-transaccion">
                <div className="detalle">
                  <span>Concepto:</span>
                  <span>{concepto}</span>
                </div>
                <div className="detalle">
                  <span>Periodo:</span>
                  <span>{periodo}</span>
                </div>
                <div className="detalle">
                  <span>Monto:</span>
                  <span>${monto} COP</span>
                </div>
                <div className="detalle">
                  <span>Banco:</span>
                  <span>{resultado.banco}</span>
                </div>
                <div className="detalle">
                  <span>Autorización:</span>
                  <span>{resultado.codigoAutorizacion}</span>
                </div>
              </div>
              
              <p>Redirigiendo en 3 segundos...</p>
            </>
          ) : (
            <>
              <p className="error-text">{resultado.mensajeError}</p>
              <button 
                onClick={() => setResultado(null)}
                className="btn-secundario"
              >
                Intentar Nuevamente
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
          <div className="tarjetas-aceptadas">Visa, Mastercard, American Express</div>
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

        <button type="submit" className="btn-pagar">
          Pagar ${monto} COP
        </button>

        <button type="button" onClick={onCancelar} className="btn-secundario">
          Cancelar
        </button>

        <div className="seguridad-info">
          🔒 Transacción segura • Tus datos están protegidos
        </div>
      </form>
    </div>
  );
};

export default PagoForm;