// Archivo requerido por Next.js para cargar Sentry en el servidor.
// Documentación: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// Captura errores no controlados en React Server Components
export const onRequestError = async (
  err: unknown,
  request: Request,
  context: { routerKind: string; routePath: string; routeType: string }
) => {
  const { captureRequestError } = await import("@sentry/nextjs");
  captureRequestError(err, request, context);
};
