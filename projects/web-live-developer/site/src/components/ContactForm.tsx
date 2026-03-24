import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { submitLead, type LeadPayload } from '../services/leadAdapter';
import { trackLeadConversion } from '../services/tracking';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico no válido'),
  company: z.string().min(2, 'Indique el nombre de su empresa'),
  category: z.string().min(1, 'Seleccione un área de interés'),
  message: z.string().min(10, 'Cuéntenos un poco más sobre su necesidad (min. 10 caracteres)'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [track, setTrack] = useState<'creativa' | 'tecnologica' | 'consultoria' | 'none'>('none');
  const [serviceParam, setServiceParam] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    // 1. Detectar track desde persistencia
    const savedTrack = localStorage.getItem('ld_track') as any || 'none';
    setTrack(savedTrack);

    // 2. Extraer servicio desde URL
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service) {
      setServiceParam(service);
      setValue('message', `Me interesa información sobre el servicio: ${service}\n\n`);
    }

    // 3. Pre-seleccionar categoría basada en track
    if (savedTrack === 'creativa') setValue('category', 'Área Creativa');
    if (savedTrack === 'tecnologica') setValue('category', 'Área Tecnológica');
    if (savedTrack === 'consultoria') setValue('category', 'Consultoría Híbrida');
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(false);
    setErrorMsg(null);
    setIsSubmitting(true);

    const payload: LeadPayload = {
      ...data,
      track_origin: track,
      service_interest: serviceParam || undefined,
      timestamp: new Date().toISOString(),
      // UTMs podrían extraerse de cookies o params aquí
    };

    const response = await submitLead(payload);

    if (response.success) {
      trackLeadConversion(data.category, track);
      // Redirección real a /gracias
      window.location.href = '/gracias';
    } else {
      setErrorMsg(response.error || 'Ocurrió un error inesperado. Por favor, intente de nuevo.');
      setIsSubmitting(false);
    }
  };

  const activeColor = track === 'creativa' ? 'focus:border-accent' : track === 'tecnologica' ? 'focus:border-primary' : 'focus:border-content';
  const buttonBg = track === 'creativa' ? 'bg-accent' : track === 'tecnologica' ? 'bg-primary' : 'bg-primary';

  return (
    <div className="space-y-6">
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} />
          <p>{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-surface/30 p-8 md:p-12 rounded-3xl border border-border/50 backdrop-blur-sm shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Nombre Completo</label>
            <input 
              {...register('name')}
              placeholder="Ej. Juan Pérez"
              className={`w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm outline-none transition-all ${activeColor}`}
            />
            {errors.name && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1 tracking-tighter">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Correo Corporativo</label>
            <input 
              {...register('email')}
              placeholder="juan@empresa.com"
              className={`w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm outline-none transition-all ${activeColor}`}
            />
            {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1 tracking-tighter">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Empresa</label>
            <input 
              {...register('company')}
              placeholder="Nombre de su organización"
              className={`w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm outline-none transition-all ${activeColor}`}
            />
            {errors.company && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1 tracking-tighter">{errors.company.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Área de Interés</label>
            <div className="relative">
              <select 
                {...register('category')}
                className={`w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm outline-none transition-all appearance-none ${activeColor}`}
              >
                <option value="">Seleccione una opción</option>
                <option value="Área Tecnológica">Área Tecnológica (Software, IA, Infra)</option>
                <option value="Área Creativa">Área Creativa (Video, Branding, Marketing)</option>
                <option value="Consultoría Híbrida">Consultoría Híbrida (Estrategia 360)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            {errors.category && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1 tracking-tighter">{errors.category.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Describa su necesidad</label>
          <textarea 
            {...register('message')}
            rows={4}
            placeholder="¿En qué podemos ayudarle hoy?"
            className={`w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none ${activeColor}`}
          ></textarea>
          {errors.message && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1 tracking-tighter">{errors.message.message}</p>}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl text-background font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 ${buttonBg} shadow-lg shadow-black/20`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Enviando...
            </>
          ) : (
            <>
              <Send size={18} />
              Enviar Consulta
            </>
          )}
        </button>

        <p className="text-center text-[10px] font-medium text-muted/60 px-8 leading-relaxed uppercase tracking-widest">
          Al enviar este formulario, acepta que Live Developer procese sus datos para fines comerciales. 
          <br className="hidden md:block" /> No compartimos su información con terceros.
        </p>
      </form>
    </div>
  );
};
