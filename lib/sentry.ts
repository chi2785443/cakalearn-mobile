import * as Sentry from "@sentry/react-native";

/**
 * Crash + error reporting. Off until EXPO_PUBLIC_SENTRY_DSN is set (per EAS build profile),
 * so dev builds and forks send nothing. No PII: no emails, names or device identifiers.
 */
const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

export const sentryEnabled = !!dsn;

export function initSentry() {
  if (!dsn) return;
  Sentry.init({
    dsn,
    environment: process.env.EXPO_PUBLIC_SENTRY_ENVIRONMENT || (__DEV__ ? "development" : "production"),
    tracesSampleRate: Number(process.env.EXPO_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || 0),
    sendDefaultPii: false,
  });
}

/** Server faults (5xx) only, tagged with the API's X-Request-ID so the issue joins the backend log line. */
export function reportServerError(error: { response?: { status?: number; headers?: Record<string, unknown> }; config?: { method?: string; url?: string } }) {
  const status = error.response?.status ?? 0;
  if (!sentryEnabled || status < 500) return;
  Sentry.captureException(error, {
    tags: { request_id: String(error.response?.headers?.["x-request-id"] ?? "-"), status },
    extra: { method: error.config?.method, url: error.config?.url },
  });
}
