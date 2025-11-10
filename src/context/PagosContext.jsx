import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  transacciones: [],
  pagoEnProceso: false,
  ultimaTransaccion: null
};

// Reducer para manejar acciones
const pagoReducer = (state, action) => {
  switch (action.type) {
    case 'INICIAR_PAGO':
      return { ...state, pagoEnProceso: true };
    
    case 'PAGO_EXITOSO':
      return {
        ...state,
        pagoEnProceso: false,
        ultimaTransaccion: action.payload,
        transacciones: [action.payload, ...state.transacciones]
      };
    
    case 'PAGO_FALLIDO':
      return {
        ...state,
        pagoEnProceso: false,
        ultimaTransaccion: action.payload
      };
    
    case 'LIMPIAR_ESTADO':
      return { ...state, ultimaTransaccion: null };
    
    default:
      return state;
  }
};

const PagoContext = createContext();

export const PagoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pagoReducer, initialState);

  return (
    <PagoContext.Provider value={{ state, dispatch }}>
      {children}
    </PagoContext.Provider>
  );
};

export const usePago = () => {
  const context = useContext(PagoContext);
  if (!context) {
    throw new Error('usePago debe ser usado dentro de PagoProvider');
  }
  return context;
};