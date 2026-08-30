import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

const realClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

// Cliente público de solo lectura (usa el CDN de Sanity). Se usa para
// mostrar el blog en el sitio. Nunca lleva un token de escritura.
// Si todavía no hay proyecto de Sanity configurado (ver
// .env.local.example), las consultas devuelven `undefined` en vez de
// romper el sitio o el build; cada llamador decide el valor por defecto.
export const client = {
  fetch: async <T>(
    query: string,
    params: QueryParams = {}
  ): Promise<T | undefined> => {
    if (!realClient) return undefined;
    return realClient.fetch<T>(query, params);
  },
};
