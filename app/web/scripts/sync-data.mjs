import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const SERVICE_MATRIX_PATH = path.join(__dirname, '../../../base/masters/company/09-SERVICE-MATRIX.md');
const OUTPUT_DATA_PATH = path.join(__dirname, '../src/data/services.json');

function parseMarkdownTable(content) {
  const lines = content.split('\n');
  const tableStartIndex = lines.findIndex(line => line.includes('| service_code |'));
  
  if (tableStartIndex === -1) return [];

  // Skip header and separator
  const dataLines = lines.slice(tableStartIndex + 2);
  const services = [];

  for (const line of dataLines) {
    if (!line.trim().startsWith('|')) continue;
    
    const columns = line.split('|').map(col => col.trim()).filter(col => col !== '');
    if (columns.length < 8) continue;

    const [
      service_code,
      service_name,
      category,
      unit,
      scope_base,
      not_included,
      inputs,
      owner_area
    ] = columns;

    services.push({
      service_code: service_code.replace(/`/g, ''),
      service_name,
      category,
      unit,
      scope_base,
      not_included,
      inputs,
      owner_area
    });
  }

  return services;
}

try {
  console.log('--- Sincronizando Catálogo de Servicios Live Developer ---');
  
  if (!fs.existsSync(SERVICE_MATRIX_PATH)) {
    throw new Error(`Fuente de verdad no encontrada en: ${SERVICE_MATRIX_PATH}`);
  }

  const content = fs.readFileSync(SERVICE_MATRIX_PATH, 'utf-8');
  const services = parseMarkdownTable(content);

  if (services.length === 0) {
    throw new Error('No se detectaron servicios en la matriz de Markdown.');
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_DATA_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_DATA_PATH, JSON.stringify(services, null, 2));
  
  console.log(`✅ Éxito: ${services.length} servicios sincronizados en ${OUTPUT_DATA_PATH}`);
} catch (error) {
  console.error(`❌ Error en sincronización: ${error.message}`);
  process.exit(1);
}
