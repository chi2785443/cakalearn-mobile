/**
 * Usage analytics. Off until EXPO_PUBLIC_POSTHOG_API_KEY is set (per EAS build profile),
 * so dev builds and forks send nothing. Session replay stays off — screens can show
 * student results and payment details.
 *
 * Shares one PostHog project (free plan: 1 project) with Cakonstruct mobile — every
 * event gets an "app" super property (see AnalyticsGate in app/_layout.tsx) so the two
 * apps stay distinguishable in the shared dashboard.
 */
export const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
export const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

export const posthogEnabled = !!posthogApiKey;
export const POSTHOG_APP_TAG = "cakalearn";
