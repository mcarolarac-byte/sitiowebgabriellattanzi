/**
 * Calcula los hashes SHA-256 de los bloques <style> y <script> inline
 * que Next.js inyecta en el build estático.
 *
 * Uso:
 *   npm run build          # primero hacer el build
 *   node scripts/csp-hashes.mjs
 *
 * Los hashes de style-src van directamente a next.config.ts.
 * Los hashes de script-src: revisar cuáles son estables entre builds
 * antes de añadirlos (los RSC payloads cambian con el contenido).
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const appDir = join(process.cwd(), ".next/server/app");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : full;
  });
}

const htmlFiles = walk(appDir).filter((f) => f.endsWith(".html"));

// ── STYLE hashes ────────────────────────────────────────────────────────────
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
const styleHashes = new Map(); // hash → Set<file>
let styleTotal = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  let match;
  while ((match = styleRegex.exec(html)) !== null) {
    const content = match[1];
    const hash = "sha256-" + createHash("sha256").update(content).digest("base64");
    const rel = file.replace(process.cwd(), "");
    if (!styleHashes.has(hash)) styleHashes.set(hash, new Set());
    styleHashes.get(hash).add(rel);
    styleTotal++;
  }
}

console.log("═══════════════════════════════════════════");
console.log("  STYLE hashes (para style-src)");
console.log("═══════════════════════════════════════════");
if (styleTotal === 0) {
  console.log("Ninguno — style-src 'self' es suficiente.");
} else {
  for (const [hash, files] of styleHashes) {
    console.log(`\n'${hash}'`);
    console.log("  Aparece en: " + [...files].join(", "));
  }
  console.log(`\nTotal: ${styleTotal} ocurrencias, ${styleHashes.size} hashes únicos.`);
}

// ── SCRIPT hashes ────────────────────────────────────────────────────────────
// Solo scripts inline (sin atributo src). Excluimos los RSC payload chunks
// (self.__next_f.push) porque cambian con el contenido de la página.
const scriptRegex = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/g;
const scriptHashes = new Map(); // hash → {content, files}
let scriptTotal = 0;
let rscSkipped = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const content = match[1].trim();
    if (!content) continue;

    // Los RSC payload chunks siempre empiezan con self.__next_f.push
    // Son dinámicos (cambian con el contenido) → no se pueden hashear
    if (content.startsWith("self.__next_f.push")) {
      rscSkipped++;
      continue;
    }

    const hash = "sha256-" + createHash("sha256").update(content).digest("base64");
    const rel = file.replace(process.cwd(), "");
    if (!scriptHashes.has(hash)) {
      scriptHashes.set(hash, { content: content.slice(0, 100).replace(/\n/g, " "), files: new Set() });
    }
    scriptHashes.get(hash).files.add(rel);
    scriptTotal++;
  }
}

console.log("\n═══════════════════════════════════════════");
console.log("  SCRIPT hashes (para script-src)");
console.log("═══════════════════════════════════════════");
if (rscSkipped > 0) {
  console.log(`(${rscSkipped} RSC payload chunks omitidos — son dinámicos, no se pueden hashear)`);
}
if (scriptTotal === 0) {
  console.log("Ningún script inline estático encontrado.");
} else {
  for (const [hash, { content, files }] of scriptHashes) {
    const stable = files.size > 1 ? "✓ estable" : "? verificar";
    console.log(`\n'${hash}' [${stable}]`);
    console.log("  Aparece en: " + [...files].join(", "));
    console.log("  Preview   : " + content);
  }
  console.log(`\nTotal: ${scriptTotal} ocurrencias, ${scriptHashes.size} hashes únicos.`);
  console.log("\n⚠ Los hashes marcados '? verificar' solo aparecen en una página.");
  console.log("  Hacer 2 builds distintos y comparar — si el hash cambia, es dinámico.");
}

console.log("\n═══════════════════════════════════════════");
console.log("  PRÓXIMO PASO");
console.log("═══════════════════════════════════════════");
console.log("Si todos los script hashes son estables entre builds:");
console.log("  1. Añadirlos a script-src en next.config.ts");
console.log("  2. Añadir 'strict-dynamic' para los chunks que Next.js carga dinámicamente");
console.log("  3. Quitar 'unsafe-inline' de script-src");
console.log("  4. Desplegar y verificar que el sitio funciona (Turnstile incluido)");
