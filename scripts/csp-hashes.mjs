/**
 * Calcula los hashes SHA-256 de los bloques <style> inline que Next.js
 * inyecta en _not-found y _global-error.
 *
 * Uso:
 *   npm run build          # primero hacer el build
 *   node scripts/csp-hashes.mjs
 *
 * Copiar los hashes que devuelva y actualizar style-src en next.config.ts.
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
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;

let total = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  let match;
  while ((match = styleRegex.exec(html)) !== null) {
    const content = match[1];
    const hash = createHash("sha256").update(content).digest("base64");
    const rel = file.replace(process.cwd(), "");
    console.log("\nArchivo : " + rel);
    console.log("Hash    : 'sha256-" + hash + "'");
    console.log("Preview : " + content.slice(0, 80).replace(/\n/g, " "));
    total++;
  }
}

if (total === 0) {
  console.log("No se encontraron bloques <style> inline. style-src 'self' es suficiente.");
} else {
  console.log("\nTotal: " + total + " hash(es). Copiar los sha256 en style-src de next.config.ts");
}
