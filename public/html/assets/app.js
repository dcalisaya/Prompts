const files = [
  "services.json",
  "service_matrix.json",
  "pricing.json",
  "quotation_rules.json",
  "brief_templates.json",
  "workflow.json",
  "legal_commercial.json",
  "knowledge_base.json",
  "roles_map.json",
  "navigation_map.json",
  "prompts_operativos.json",
  "agentes_maestros.json",
];

async function loadJson(name) {
  const res = await fetch(`../../base/json/${name}`);
  if (!res.ok) throw new Error(`No se pudo cargar ${name}`);
  return res.json();
}

function summarize(data) {
  if (Array.isArray(data)) return `${data.length} registros`;
  if (data && typeof data === "object") return `${Object.keys(data).length} claves`;
  return "sin datos";
}

async function init() {
  const root = document.getElementById("datasets");
  for (const file of files) {
    const card = document.createElement("article");
    card.className = "card";
    const title = document.createElement("h2");
    title.textContent = file;
    const meta = document.createElement("p");
    meta.className = "meta";
    try {
      const data = await loadJson(file);
      meta.textContent = summarize(data);
      const pre = document.createElement("pre");
      pre.textContent = JSON.stringify(data, null, 2).slice(0, 2400);
      card.append(title, meta, pre);
    } catch (error) {
      meta.textContent = String(error.message || error);
      card.append(title, meta);
    }
    root.appendChild(card);
  }
}

init();
