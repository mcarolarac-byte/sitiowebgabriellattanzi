import * as Sentry from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: "https://b6b87aac48fe8bd4aa8746e707f0464f@o4512001621360640.ingest.de.sentry.io/4512001624899664",

  // 10 % en produccion; 100 % en desarrollo para facilitar la depuracion.
  tracesSampleRate: isProd ? 0.1 : 1.0,

  // Session Replay: solo se graba cuando ocurre un error (no proactivamente).
  // Esto evita capturar sesiones de usuarios sin consentimiento explicito.
  // Si en el futuro se vincula al consentimiento de cookies, se puede
  // activar replaysSessionSampleRate condicionalmente.
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,

  integrations: [Sentry.replayIntegration({
    // Asegura que el formulario de contacto queda enmascarado
    maskAllInputs: true,
    blockAllMedia: true,
  })],

  debug: !isProd,
});
