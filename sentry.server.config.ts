import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://b6b87aac48fe8bd4aa8746e707f0464f@o4512001621360640.ingest.de.sentry.io/4512001624899664",
  tracesSampleRate: 1.0,
  debug: false,
});
