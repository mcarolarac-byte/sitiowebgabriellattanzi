export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// El blog/CMS todavía no está conectado hasta que exista un proyecto real
// de Sanity (ver .env.local.example). Mientras tanto el sitio sigue
// funcionando y el blog se muestra vacío en vez de romper el build.
export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
);
