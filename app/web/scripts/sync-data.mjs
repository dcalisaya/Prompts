import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(projectRoot, '..', '..');
const sourceJsonDir = path.join(repoRoot, 'base', 'json');
const targetDataDir = path.join(projectRoot, 'public', 'data');
const targetManualFilesDir = path.join(projectRoot, 'public', 'manual-files');
const targetPromptFilesDir = path.join(projectRoot, 'public', 'prompt-files');
const targetAgentFilesDir = path.join(projectRoot, 'public', 'agent-files');
rmSync(targetDataDir, { recursive: true, force: true });
rmSync(targetManualFilesDir, { recursive: true, force: true });
rmSync(targetPromptFilesDir, { recursive: true, force: true });
rmSync(targetAgentFilesDir, { recursive: true, force: true });
mkdirSync(targetDataDir, { recursive: true });
mkdirSync(targetManualFilesDir, { recursive: true });
mkdirSync(targetPromptFilesDir, { recursive: true });
mkdirSync(targetAgentFilesDir, { recursive: true });
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

const promptsOperativosPath = path.join(sourceJsonDir, 'prompts_operativos.json');
if (existsSync(promptsOperativosPath)) {
  const promptsOperativos = JSON.parse(readFileSync(promptsOperativosPath, 'utf-8'));
  const prompts = Array.isArray(promptsOperativos) ? promptsOperativos : promptsOperativos.prompts ?? [];
  let promptsCopied = 0;

  for (const prompt of prompts) {
    if (!prompt.path) continue;
    const sourcePath = path.join(repoRoot, prompt.path);
    if (!existsSync(sourcePath)) continue;
    const idMatch = prompt.id || prompt.path?.match(/([A-Z]+-\d+)/);
    const promptId = idMatch ? (typeof idMatch === 'string' ? idMatch : idMatch[1]) : prompt.path.split('/').pop()?.replace('.md', '');
    writeFileSync(
      path.join(targetPromptFilesDir, `${promptId}.md`),
      readFileSync(sourcePath, 'utf-8'),
      'utf-8',
    );
    promptsCopied++;
  }

  console.log(`Copied ${promptsCopied} prompt markdown files to ${targetPromptFilesDir}`);
} else {
  console.log('prompts_operativos.json not found; prompt markdown files were not copied');
}

const agentesMaestrosPath = path.join(sourceJsonDir, 'agentes_maestros.json');
if (existsSync(agentesMaestrosPath)) {
  const agentesMaestros = JSON.parse(readFileSync(agentesMaestrosPath, 'utf-8'));
  const agents = Array.isArray(agentesMaestros) ? agentesMaestros : agentesMaestros.agents ?? [];
  let agentsCopied = 0;

  for (const agent of agents) {
    if (!agent.path) continue;
    const sourcePath = path.join(repoRoot, agent.path);
    if (!existsSync(sourcePath)) continue;
    writeFileSync(
      path.join(targetAgentFilesDir, `${agent.name}.md`),
      readFileSync(sourcePath, 'utf-8'),
      'utf-8',
    );
    agentsCopied++;
  }

  console.log(`Copied ${agentsCopied} agent markdown files to ${targetAgentFilesDir}`);
} else {
  console.log('agentes_maestros.json not found; agent markdown files were not copied');
}
