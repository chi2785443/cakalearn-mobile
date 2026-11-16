// Sentry wrapper = Expo default config + debug IDs, so EAS builds can upload matching source maps.
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { withNativeWind } = require("nativewind/metro");

const config = getSentryExpoConfig(__dirname);

// Allow Metro to bundle SVG files as static assets (used by expo-image)
config.resolver.assetExts.push("svg");

module.exports = withNativeWind(config, { input: "./global.css" });
