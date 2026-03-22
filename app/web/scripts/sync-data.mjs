import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(projectRoot, '..', '..');
const sourceJsonDir = path.join(repoRoot, 'base', 'json');
const targetDataDir = path.join(projectRoot, 'public', 'data');
const targetManualFilesDir = path.join(projectRoot, 'public', 'manual-files');
rmSync(targetDataDir, { recursive: true, force: true });
rmSync(targetManualFilesDir, { recursive: true, force: true });
mkdirSync(targetDataDir, { recursive: true });
mkdirSync(targetManualFilesDir, { recursive: true });
cpSync(sourceJsonDir, targetDataDir, { recursive: true });

const manualesMaestrosPath = path.join(sourceJsonDir, 'manuales_maestros.json');
if (existsSync(manualesMaestrosPath)) {
  const manualesMaestros = JSON.parse(readFileSync(manualesMaestrosPath, 'utf-8'));
  const manuals = manualesMaestros.manuals ?? [];

  for (const manual of manuals) {
    const sourcePath = path.join(repoRoot, manual.path);
    if (!existsSync(sourcePath)) continue;
    writeFileSync(
      path.join(targetManualFilesDir, `${manual.id}.md`),
      readFileSync(sourcePath, 'utf-8'),
      'utf-8',
    );
  }

  writeFileSync(
    path.join(targetDataDir, 'manuals.json'),
    `${JSON.stringify(manuals, null, 2)}\n`,
    'utf-8',
  );

  console.log(`Synced data to ${targetDataDir}`);
  console.log(`Generated manuals.json from manuales_maestros.json with ${manuals.length} manuals`);
  console.log(`Copied ${manuals.length} manual markdown files to ${targetManualFilesDir}`);
} else {
  console.log(`Synced data to ${targetDataDir}`);
  console.log('manuales_maestros.json not found; manuals.json was not regenerated');
}
