import React, { useState } from 'react';
import { Settings, Video, Code, BarChart, Database, Cpu, MessageSquare, Megaphone, PenTool, Layout, Layers, Users, Zap, Search, PieChart, ShieldCheck, Plus, Minus, AlertCircle, FileInput, Info, UserCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ServiceCardProps {
  code: string;
  name: string;
  summary?: string;
  target?: string;
  scope: string;
  area: 'creativa' | 'tecnologica' | 'consultoria';
  not_included?: string;
  inputs?: string;
  unit?: string;
  value_proposition?: string;
}

const IconMap: Record<string, React.ElementType> = {
  'AV': Video, 'MK': Megaphone, 'BR': PenTool, 'INF': Database,
  'DEV': Code, 'IA': Cpu, 'PR': MessageSquare, 'DAT': BarChart,
  'MED': PieChart, 'BIZ': Settings, 'ECO': Zap, 'CX': Users,
  'CNT': Layout, 'IMK': Layers, 'EXP': Search, 'HLT': ShieldCheck, 'ESG': ShieldCheck
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  code, name, summary, target, scope, area, not_included, inputs, unit, value_proposition 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const prefix = code.split('-')[0];
  const Icon = IconMap[prefix] || Settings;
  
  const isCreative = area === 'creativa';
  const isTech = area === 'tecnologica';
  
  const accentColor = isCreative ? 'text-accent' : isTech ? 'text-primary' : 'text-content';
  const borderHover = isCreative ? 'hover:border-accent/50' : isTech ? 'hover:border-primary/50' : 'hover:border-content/50';
  const buttonBg = isCreative ? 'bg-accent' : isTech ? 'bg-primary' : 'bg-primary';

  return (
    <div 
      className={cn(
        "group flex flex-col h-full bg-surface border border-border rounded-2xl transition-all duration-500 overflow-hidden outline-none",
        borderHover,
        isExpanded && "ring-1 ring-border shadow-2xl scale-[1.02] z-10"
      )}
    >
      <div className="p-6 flex-grow flex flex-col">
        {/* Top: Meta & Icon */}
        <div className="flex items-start justify-between mb-6">
          <div className={cn("p-3 rounded-xl bg-background border border-border shadow-inner transition-colors", accentColor)}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold font-mono tracking-widest text-muted uppercase bg-background px-2 py-1 rounded border border-border/50">
              {code}
            </span>
            {unit && <span className="text-[9px] font-bold text-muted/40 uppercase tracking-tighter">{unit}</span>}
          </div>
        </div>
        
        {/* Middle: Title & Main Summary */}
        <div className="flex-grow">
          <h3 className="text-xl font-heading font-bold mb-3 tracking-tight leading-tight group-hover:text-content transition-colors">
            {name}
          </h3>
          
          <p className={cn(
            "text-muted text-sm leading-relaxed transition-all duration-300",
            !isExpanded && "line-clamp-2"
          )}>
            {summary || scope}
          </p>
        </div>

        {/* Info Técnica Expandida (The "Detalle") */}
        {isExpanded && (
          <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            
            {target && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted/60">
                  <UserCheck size={14} />
                  <span>Perfil Objetivo</span>
                </div>
                <p className="text-[13px] text-content/90 pl-0 leading-relaxed font-medium">{target}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 bg-background/50 p-5 rounded-2xl border border-border/30">
              {scope && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/70">
                    <Info size={14} />
                    <span>Alcance Base</span>
                  </div>
                  <p className="text-[13px] text-muted leading-relaxed">{scope}</p>
                </div>
              )}

              {value_proposition && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent/70">
                    <Zap size={14} />
                    <span>Valor Agregado</span>
                  </div>
                  <p className="text-[13px] text-muted leading-relaxed">{value_proposition}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {inputs && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted/50">
                    <FileInput size={14} />
                    <span>Inputs</span>
                  </div>
                  <p className="text-[12px] text-muted/70 leading-relaxed italic">{inputs}</p>
                </div>
              )}
              
              {not_included && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-400/40">
                    <AlertCircle size={14} />
                    <span>No Incluye</span>
                  </div>
                  <p className="text-[12px] text-muted/70 leading-relaxed">{not_included}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom: Action bar */}
      <div className="px-6 pb-6 mt-auto">
        <div className={cn("pt-4 border-t border-border flex items-center justify-between", !isExpanded && "border-transparent")}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted hover:text-content transition-colors"
          >
            {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
            {isExpanded ? 'Cerrar Ficha' : 'Ver Ficha Técnica'}
          </button>

          {isExpanded && (
            <a 
              href={`/contacto?service=${code}`}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-background transition-all animate-in zoom-in-90 hover:opacity-90 active:scale-95 shadow-lg shadow-black/20",
                buttonBg
              )}
            >
              Cotizar <Zap size={12} fill="currentColor" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
