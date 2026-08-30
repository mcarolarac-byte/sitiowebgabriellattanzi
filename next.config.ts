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
            "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' https://cdn.sanity.io data:",
            "font-src 'self'",
            "connect-src 'self' https://challenges.cloudflare.com https://*.sanity.io https://*.ingest.de.sentry.io",
            "frame-src https://calendly.com https://challenges.cloudflare.com",
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
        // El Studio de Sanity necesita sus propios permisos de script/estilo
        // y no debe heredar el CSP estricto del sitio público.
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
  hideSourceMaps: true,
  // Desactiva logs internos de Sentry en runtime
  disableLogger: true,
});
