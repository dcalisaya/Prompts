import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(projectRoot, '..', '..');
const sourceJsonDir = path.join(repoRoot, 'base', 'json');
const targetDataDir = path.join(projectRoot, 'public', 'data');
const manualsDirs = [
  path.join(repoRoot, 'base', 'masters', 'manuales-desarrollo'),
  path.join(repoRoot, 'base', 'masters', 'manuales-produccion'),
];

const disciplineByManualDir = {
  'manuales-desarrollo': 'Desarrollo de Software',
  'manuales-produccion': 'Producción Audiovisual',
};

const titleCaseFromFile = (fileName) => {
  const base = fileName.replace(/\.md$/i, '').replace(/[_-]+/g, ' ').trim();
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : fileName;
};

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

rmSync(targetDataDir, { recursive: true, force: true });
mkdirSync(targetDataDir, { recursive: true });
cpSync(sourceJsonDir, targetDataDir, { recursive: true });

const manuals = [];

for (const dir of manualsDirs) {
  if (!existsSync(dir)) continue;
  const family = path.basename(dir);
  const discipline = disciplineByManualDir[family] ?? 'General';
  const files = readdirSync(dir).filter((file) => file.endsWith('.md'));

  for (const file of files) {
    manuals.push({
      id: slugify(file.replace(/\.md$/i, '')),
      name: titleCaseFromFile(file),
      discipline,
      family,
      path: path.relative(repoRoot, path.join(dir, file)),
      related_prompts: [],
    });
  }
}

writeFileSync(
  path.join(targetDataDir, 'manuals.json'),
  `${JSON.stringify(manuals, null, 2)}\n`,
  'utf-8',
);

console.log(`Synced data to ${targetDataDir}`);
console.log(`Generated manuals.json with ${manuals.length} manuals`);
