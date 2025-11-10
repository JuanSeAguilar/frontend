// Interfaces para tipos
interface DatosPago {
  numeroTarjeta: string;
  fechaExpiracion: string;
  cvc: string;
  nombreTitular: string;
  monto: number;
}

interface RespuestaBanco {
  exito: boolean;
  banco: string;
  codigoAutorizacion?: string;
  fechaProcesamiento: string;
  mensaje?: string;
  codigoError?: string;
  mensajeError?: string;
}

interface Transaccion {
  id: string;
  fecha: string;
  monto: number;
  moneda: string;
  tipoTarjeta: string;
  ultimosDigitos: string;
  exito: boolean;
  banco: string;
  codigoAutorizacion?: string;
  fechaProcesamiento: string;
  mensaje?: string;
  codigoError?: string;
  mensajeError?: string;
}

// Simulador de gateway de pago ultra realista
class PagoSimulador {
  private bancos: string[];
  private codigosError: Record<string, string>;

  constructor() {
    this.bancos = [
      'Bancolombia', 'Davivienda', 'BBVA', 'Banco de Bogotá', 
      'Scotiabank', 'Citibank', 'JP Morgan', 'Bank of America'
    ];
    
    this.codigosError = {
      'INSUFFICIENT_FUNDS': 'Fondos insuficientes',
      'CARD_DECLINED': 'Tarjeta rechazada',
      'EXPIRED_CARD': 'Tarjeta expirada',
      'INVALID_CVC': 'Código de seguridad inválido',
      'PROCESSING_ERROR': 'Error en el procesamiento',
      'FRAUD_SUSPECTED': 'Transacción marcada como sospechosa'
    };
  }

  // Validar tarjeta de crédito (algoritmo real Luhn)
  validarTarjeta(numero: string): boolean {
    const cleanNum = numero.replace(/\s/g, '');
    if (!/^\d+$/.test(cleanNum)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNum.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNum.charAt(i));
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  // Identificar tipo de tarjeta
  identificarTipoTarjeta(numero: string): string {
    const cleanNum = numero.replace(/\s/g, '');
    
    if (/^4/.test(cleanNum)) return 'Visa';
    if (/^5[1-5]/.test(cleanNum)) return 'Mastercard';
    if (/^3[47]/.test(cleanNum)) return 'American Express';
    if (/^6(?:011|5)/.test(cleanNum)) return 'Discover';
    return 'Desconocida';
  }

  // Simular comunicación con banco
  private async comunicarConBanco(datosPago: DatosPago): Promise<RespuestaBanco> {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
    
    const banco = this.bancos[Math.floor(Math.random() * this.bancos.length)];
    
    // 85% de probabilidad de éxito, 15% de error
    const exito = Math.random() > 0.15;
    
    if (exito) {
      return {
        exito: true,
        banco: banco,
        codigoAutorizacion: `AUTH${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        fechaProcesamiento: new Date().toISOString(),
        mensaje: 'Transacción aprobada'
      };
    } else {
      const errores = Object.keys(this.codigosError);
      const errorAleatorio = errores[Math.floor(Math.random() * errores.length)];
      
      return {
        exito: false,
        banco: banco,
        codigoError: errorAleatorio,
        mensajeError: this.codigosError[errorAleatorio],
        fechaProcesamiento: new Date().toISOString()
      };
    }
  }

  // Procesar pago principal
  async procesarPago(datosPago: DatosPago): Promise<Transaccion> {
    console.log('🔄 Iniciando procesamiento de pago...', datosPago);
    
    // Validaciones iniciales
    if (!this.validarTarjeta(datosPago.numeroTarjeta)) {
      throw new Error('Número de tarjeta inválido');
    }

    if (datosPago.monto <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }

    // Simular verificación de seguridad
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Comunicación con el "banco"
    const respuestaBanco = await this.comunicarConBanco(datosPago);
    
    // Generar respuesta completa
    const transaccion: Transaccion = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      fecha: new Date().toISOString(),
      monto: datosPago.monto,
      moneda: 'COP',
      tipoTarjeta: this.identificarTipoTarjeta(datosPago.numeroTarjeta),
      ultimosDigitos: datosPago.numeroTarjeta.slice(-4),
      ...respuestaBanco
    };

    console.log('✅ Transacción completada:', transaccion);
    return transaccion;
  }
}

export const pagoService = new PagoSimulador();