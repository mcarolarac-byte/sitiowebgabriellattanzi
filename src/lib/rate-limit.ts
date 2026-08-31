import "server-only";

// Límite de envíos en memoria, por IP.
//
// ADVERTENCIA: este mecanismo NO es distribuido. En un entorno serverless
// (Vercel) cada instancia fría arranca con sus propios contadores vacíos,
// por lo que solo frena abuso básico o bots simples dentro de la misma
// instancia. Si el tráfico crece, migrar a Vercel KV, Upstash Redis u otro
// contador distribuido. No se añade ningún servicio externo aquí sin
// autorización.

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 5;            // máximo de solicitudes por ventana
const MAX_KEYS = 10_000;           // límite de claves en memoria

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Elimina entradas cuya ventana ya venció y aplica la política de límite. */
function evictExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) {
      buckets.delete(key);
    }
  }
}

/** Expulsa la entrada más antigua cuando se alcanza el límite de claves. */
function evictOldest(): void {
  const firstKey = buckets.keys().next().value;
  if (firstKey !== undefined) {
    buckets.delete(firstKey);
  }
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();

  // Limpiar buckets vencidos en cada llamada
  evictExpired(now);

  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    // Nueva ventana
    if (buckets.size >= MAX_KEYS) {
      evictOldest();
    }
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  existing.count += 1;

  if (existing.count > MAX_REQUESTS) {
    return true;
  }

  return false;
}
