import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

// Cabeceras de seguridad (OWASP A05 - Security Misconfiguration). El CSP
// solo se aplica en producción para no romper el Fast Refresh de `next dev`.
const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  ...(isProd
    ? [
        {
          key: "Content-Security-Policy",
          value: [
            // 'unsafe-inline' en script-src sigue el patrón oficial de
            // Next.js para apps sin nonces (ver next.config docs de CSP):
            // los nonces obligarían a renderizar TODO dinámicamente y
            // perderíamos la generación estática de este sitio, que no
            // maneja datos sensibles ni sesiones de usuario. Si en el
            // futuro se agregan flujos con datos sensibles, reconsiderar
            // con nonces vía proxy.ts.
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com",
            // SHA-256 exactos de los <style> inline que inyecta Next.js en _not-found y _global-error.
            // Actualizar si se hace upgrade de Next.js (ejecutar: node scripts/csp-hashes.mjs).
            // 'unsafe-hashes' permite hashes en atributos style= (necesario para next/image y next-route-announcer).
            // Los tres hashes de estilo inline son de Next.js, no de código propio.
            "style-src 'self' 'unsafe-hashes' 'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' 'sha256-ZDrxqUOB4m/L0JWL/+gS52g1CRH0l/qwMhjTw5Z/Fsc=' 'sha256-32t0bJPIyxns/QqsW8RE3JGUERKnHL5RygHBgJvEanc=' 'sha256-Wwucq8eX2r0YFymkQhDXm5hN0+FfSvI3s4JSSaqa4iw=' 'sha256-Z5XTK23DFuEMs0PwnyZDO9SWxemQ5HxcpVaBNuUJyWY='",
            "img-src 'self' https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com data:",
            "font-src 'self'",
            "connect-src 'self' https://challenges.cloudflare.com https://*.sanity.io https://*.ingest.de.sentry.io https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://region1.analytics.google.com",
            "frame-src https://challenges.cloudflare.com",
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
          ].join("; "),
        },
      ]
    : []),
];

// Headers básicos para el Studio de Sanity. Sin CSP: el Studio carga
// scripts y estilos dinámicamente (SPA compleja) y una CSP estricta
// lo rompería. HSTS no es necesario aquí porque el navegador lo cachea
// por origen y ya lo recibe en cualquier otra ruta del sitio.
const studioHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Refuerza el noindex declarado en el metadata del layout del Studio.
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [
      {
        // Assets de Next.js: inmutables (el hash cambia con cada build)
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Imágenes optimizadas por Next.js
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        // Studio de Sanity: headers básicos sin CSP.
        source: "/studio(.*)",
        headers: studioHeaders,
      },
      {
        // Sitio público: headers completos con CSP en producción.
        // La negación (?!studio) excluye el Studio para no pisar
        // los headers que definimos arriba.
        source: "/((?!studio).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Silencia el output de Sentry durante el build
  silent: !process.env.CI,
  // Oculta los source maps del bundle público (los sube a Sentry cifrados)
  sourcemaps: { deleteSourcemapsAfterUpload: true },
  // Reduce el bundle de Sentry eliminando logs de depuración
  webpack: {
    treeshake: { removeDebugLogging: true },
  },
});
