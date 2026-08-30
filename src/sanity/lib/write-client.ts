import "server-only";
import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

// Cliente de escritura, SOLO para uso en el servidor (Server Actions /
// Route Handlers). El token debe tener permiso únicamente de "Create" y
// restringido al tipo de documento "lead" — nunca el token de administrador.
// Ver .env.local.example -> SANITY_WRITE_TOKEN.
//
// Se crea de forma perezosa (no al importar el archivo) para que el sitio
// pueda compilarse y desplegarse antes de que exista el proyecto de Sanity.
let cachedClient: SanityClient | null = null;

export function getWriteClient(): SanityClient {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!isSanityConfigured || !token) {
    throw new Error(
      "Sanity todavía no está configurado (falta NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_WRITE_TOKEN)."
    );
  }
  if (!cachedClient) {
    cachedClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    });
  }
  return cachedClient;
}
