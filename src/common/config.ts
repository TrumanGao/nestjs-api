export const APP_MODE = process.env.APP_MODE as ModeType;
console.log(`APP_MODE: ${APP_MODE}`);

export const ALLOWED_ORIGINS_MAP = {
  DEVELOPMENT: [],
  TESTING: [],
  PRODUCTION: [],
};
/**
 * whitelist of origins
 */
export const ALLOWED_ORIGINS = ALLOWED_ORIGINS_MAP[APP_MODE].map(
  (host) => `https://${host}`,
);
