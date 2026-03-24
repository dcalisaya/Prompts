/**
 * Tracking Service - Live Developer (v1.0)
 * Wrapper desacoplado para analítica (GA4, GTM, Pixel).
 */

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  try {
    // GA4 / GTM standard
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
    
    // Log para desarrollo
    console.debug(`[Tracking] ${eventName}`, params);
  } catch (e) {
    console.warn('Error en tracking:', e);
  }
};

export const trackLeadConversion = (category: string, track: string) => {
  trackEvent('generate_lead', {
    service_category: category,
    track_origin: track,
    value: 0,
    currency: 'USD'
  });
};
