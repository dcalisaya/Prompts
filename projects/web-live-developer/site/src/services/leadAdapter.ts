/**
 * Lead Adapter - Live Developer (v1.0)
 * Encapsula la integración con el backend/CRM para el envío de prospectos.
 */

export interface LeadPayload {
  name: string;
  email: string;
  company: string;
  category: string;
  message: string;
  track_origin?: string;
  service_interest?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  timestamp: string;
}

export interface LeadResponse {
  success: boolean;
  error?: string;
}

/**
 * Punto de integración para CRM/Webhook.
 * Para producción: Reemplazar el bloque mock por una llamada real a fetch().
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    // --- BLOQUE DE INTEGRACIÓN REAL (PENDIENTE CREDENCIALES) ---
    /*
    const response = await fetch('https://api.livedeveloper.com/v1/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    return { success: true };
    */

    // --- MOCK DE DESARROLLO ---
    console.info('LeadAdapter: Enviando payload...', payload);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simular latencia red
    
    // Simular error aleatorio para testeo de UI (1 de cada 10 envíos)
    if (Math.random() < 0.1) {
      throw new Error('Servidor temporalmente fuera de línea');
    }

    return { success: true };
  } catch (error: any) {
    console.error('LeadAdapter: Error al procesar el lead:', error.message);
    return { success: false, error: error.message };
  }
}
