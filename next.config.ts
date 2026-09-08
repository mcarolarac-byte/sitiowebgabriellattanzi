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
            // 'unsafe-inline' en script-src: los RSC payload chunks (self.__next_f.push)
            // son scripts inline que cambian por página/build y no se pueden hashear.
            // Nonces eliminarían esto pero obligan a renderizado dinámico, incompatible
            // con generación estática. Riesgo aceptado: sitio sin sesiones ni datos
            // sensibles en el cliente. Revisitar si se añaden flujos autenticados.
            "default-src 'self'",
            // https://vercel.live: widget de feedback de Vercel (solo activo en previews, inofensivo en producción).
            "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://vercel.live",
            // SHA-256 exactos de los <style> inline que inyecta Next.js en _not-found y _global-error.
            // Actualizar si se hace upgrade de Next.js (ejecutar: node scripts/csp-hashes.mjs).
            // 'unsafe-hashes' permite hashes en atributos style= (necesario para next/image y next-route-announcer).
            // Los tres hashes de estilo inline son de Next.js, no de código propio.
            "style-src 'self' 'unsafe-hashes' 'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' 'sha256-ZDrxqUOB4m/L0JWL/+gS52g1CRH0l/qwMhjTw5Z/Fsc=' 'sha256-32t0bJPIyxns/QqsW8RE3JGUERKnHL5RygHBgJvEanc=' 'sha256-Wwucq8eX2r0YFymkQhDXm5hN0+FfSvI3s4JSSaqa4iw=' 'sha256-Z5XTK23DFuEMs0PwnyZDO9SWxemQ5HxcpVaBNuUJyWY='",
            // https://www.google.*: pixel de remarketing de Google Ads (ga-audiences). Se usa un wildcard
            // de subdominio porque varía por país (google.es, google.com, etc.).
            "img-src 'self' https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com https://*.google.com https://*.google.es data:",
            "font-src 'self'",
            // stats.g.doubleclick.net: señales de conversión de Google Ads vía gtag.
            // vercel.live: canal de datos del widget de feedback (solo en previews).
            "connect-src 'self' https://challenges.cloudflare.com https://*.sanity.io https://*.ingest.de.sentry.io https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://region1.analytics.google.com https://stats.g.doubleclick.net https://vercel.live",
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

// Headers para el Studio de Sanity. HSTS no es necesario porque el navegador
// lo cachea por origen y ya lo recibe en cualquier ruta del sitio público.
//
// CSP del Studio: Sanity Studio v5 es una SPA compleja que requiere:
//   - 'unsafe-inline' + 'unsafe-eval' en script-src: carga módulos dinámicamente
//     y usa eval() en el editor de texto enriquecido (ProseMirror).
//   - 'unsafe-inline' en style-src: inyecta estilos en tiempo de ejecución.
//   - worker-src blob:: usa Web Workers para la indexación local del contenido.
//   - lh3.googleusercontent.com: avatares de Google del usuario autenticado.
// Dominios auditados con DevTools (Network + console filter) en septiembre 2026.
// Si se agrega un plugin de Sanity que carga recursos externos, revisar aquí.
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
  ...(isProd
    ? [
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            // 'unsafe-eval' requerido por ProseMirror (editor de texto enriquecido de Sanity).
            // 'unsafe-inline' requerido por la carga dinámica de módulos del Studio.
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io https://*.sanity-cdn.com https://sanity-cdn.com https://core.sanity-cdn.com",
            // Sanity inyecta estilos en tiempo de ejecución (CSS-in-JS y design system).
            "style-src 'self' 'unsafe-inline' https://*.sanity.io https://*.sanity-cdn.com https://design-system-static.sanity.io",
            // cdn.sanity.io: imágenes del contenido. lh3.googleusercontent.com: avatar del usuario.
            // blob: para previsualizaciones de imágenes antes de subir.
            "img-src 'self' https://cdn.sanity.io https://lh3.googleusercontent.com data: blob:",
            // Tipografías del design system de Sanity.
            "font-src 'self' https://design-system-static.sanity.io https://core.sanity-cdn.com https://*.sanity-cdn.com",
            // API de Sanity, CDN y WebSockets (listener de cambios en tiempo real).
            "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://sanity-cdn.com https://core.sanity-cdn.com https://api.sanity.io",
            // Web Workers para indexación local del contenido en el Studio.
            "worker-src blob: 'self'",
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
          ].join("; "),
        },
      ]
    : []),
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
