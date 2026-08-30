import "server-only";

// Límite de envíos en memoria, por IP. Es "best effort": en un entorno
// serverless (Vercel) cada instancia fría tiene su propio contador, así que
// esto frena abuso básico/bots simples pero no reemplaza un límite real
// distribuido (p. ej. Upstash Redis) si el tráfico crece.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
