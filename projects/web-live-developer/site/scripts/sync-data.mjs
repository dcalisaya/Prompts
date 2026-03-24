import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const CATALOG_PATH = path.join(__dirname, '../../../../base/masters/catalog/08-SERVICES.md');
const MATRIX_PATH = path.join(__dirname, '../../../../base/masters/company/09-SERVICE-MATRIX.md');
const OUTPUT_DATA_PATH = path.join(__dirname, '../src/data/services.json');

// Mappings for tracks
const TRACK_MAPPINGS = {
  creativa: [
    'Produccion Audiovisual', 'Producción Audiovisual',
    'Diseno y Branding', 'Diseño y Branding',
    'Marketing Digital',
    'Media Planning y Performance',
    'Relaciones Publicas y Comunicacion', 'Relaciones Públicas y Comunicación',
    'Content Strategy y Copy',
    'Influencer Marketing',
    'Experiential y Eventos'
  ],
  tecnologica: [
    'Infraestructura y Web',
    'Desarrollo de Software y Apps',
    'Soluciones IA y Automatizacion', 'Soluciones IA y Automatización',
    'Data, Analytics e Insights'
  ],
  consultoria: [
    'Consultoria de Negocio', 'Consultoría de Negocio',
    'Commerce Avanzado',
    'Customer Experience y CRM',
    'Healthcare Marketing',
    'Sostenibilidad y ESG'
  ]
};

function getTrackByCategory(category) {
  for (const [track, categories] of Object.entries(TRACK_MAPPINGS)) {
    if (categories.includes(category)) return track;
  }
  return 'unclassified';
}

function parseCatalog(content) {
  const services = {};
  const serviceRegex = /### `([A-Z0-9-]+)` - (.*)\n([\s\S]*?)(?=\n### |$)/g;
  let match;

  while ((match = serviceRegex.exec(content)) !== null) {
    const code = match[1];
    const name = match[2].trim();
    const body = match[3];

    const summaryMatch = body.match(/\*\*Resumen:\*\* (.*)/);
    const targetMatch = body.match(/\*\*Para quién es:\*\* (.*)/);
    const scopeMatch = body.match(/\*\*Qué incluye \(Alcance Base\):\*\* (.*)/);
    const exclusionsMatch = body.match(/\*\*Exclusiones \/ Límites:\*\* (.*)/);
    const valueMatch = body.match(/\*\*Valor \/ Casos de Uso:\*\* (.*)/);

    services[code] = {
      editorial_name: name,
      summary: summaryMatch ? summaryMatch[1].trim() : '',
      target: targetMatch ? targetMatch[1].trim() : '',
      editorial_scope: scopeMatch ? scopeMatch[1].trim() : '',
      exclusions: exclusionsMatch ? exclusionsMatch[1].trim() : '',
      value_proposition: valueMatch ? valueMatch[1].trim() : ''
    };
  }
  return services;
}

function parseMatrix(content) {
  const lines = content.split('\n');
  const tableStartIndex = lines.findIndex(line => line.includes('| service_code |'));
  if (tableStartIndex === -1) return [];

  const dataLines = lines.slice(tableStartIndex + 2);
  const matrix = [];

  for (const line of dataLines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || trimmed.includes('| :--- |')) continue;
    const columns = line.split('|').map(col => col.trim()).filter(col => col !== '');
    if (columns.length < 8) continue;

    const [service_code, service_name, category, unit, scope_base, not_included, inputs, owner_area] = columns;
    matrix.push({
      service_code: service_code.replace(/`/g, ''),
      category,
      unit,
      inputs,
      owner_area
    });
  }
  return matrix;
}

try {
  console.log('--- Sincronizando Capa de Datos Híbrida v2.6 (Capturando Target) ---');
  
  if (!fs.existsSync(CATALOG_PATH) || !fs.existsSync(MATRIX_PATH)) {
    throw new Error('Fuentes de verdad no encontradas.');
  }

  const catalogContent = fs.readFileSync(CATALOG_PATH, 'utf-8');
  const matrixContent = fs.readFileSync(MATRIX_PATH, 'utf-8');

  const catalogData = parseCatalog(catalogContent);
  const matrixData = parseMatrix(matrixContent);

  const joinedServices = matrixData.map(item => {
    const editorial = catalogData[item.service_code] || {};
    
    return {
      service_code: item.service_code,
      service_name: editorial.editorial_name || item.service_name,
      category: item.category,
      track: getTrackByCategory(item.category),
      unit: item.unit,
      summary: editorial.summary || '',
      target: editorial.target || '',
      scope_base: editorial.editorial_scope || '',
      not_included: editorial.exclusions || '',
      inputs: item.inputs,
      value_proposition: editorial.value_proposition || '',
      owner_area: item.owner_area
    };
  });

  const categories = [...new Set(joinedServices.map(s => s.category))].sort();
  const tracks = {
    creativa: joinedServices.filter(s => s.track === 'creativa'),
    tecnologica: joinedServices.filter(s => s.track === 'tecnologica'),
    consultoria: joinedServices.filter(s => s.track === 'consultoria'),
    unclassified: joinedServices.filter(s => s.track === 'unclassified')
  };

  const output = {
    metadata: {
      sync_date: new Date().toISOString(),
      version: "2.6-hybrid",
      total_services: joinedServices.length
    },
    services: joinedServices,
    categories,
    tracks
  };

  fs.writeFileSync(OUTPUT_DATA_PATH, JSON.stringify(output, null, 2));
  console.log(`✅ Éxito: Datos enriquecidos con 'Target' y 'Copy Editorial'.`);

} catch (error) {
  console.error(`❌ Error en sincronización: ${error.message}`);
  process.exit(1);
}
