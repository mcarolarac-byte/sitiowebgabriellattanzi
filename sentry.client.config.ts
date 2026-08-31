import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://b6b87aac48fe8bd4aa8746e707f0464f@o4512001621360640.ingest.de.sentry.io/4512001624899664",

  // Captura el 100 % de las transacciones para trazas de rendimiento.
  // Baja a 0.1 (10 %) cuando el sitio tenga mucho tráfico.
  tracesSampleRate: 1.0,

  // Graba la pantalla del usuario justo antes de que ocurra un error.
  // Requiere habilitar Session Replay en el plan de Sentry.
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.05,

  integrations: [Sentry.replayIntegration()],

  debug: false,
});
