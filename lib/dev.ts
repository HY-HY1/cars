/**
 * Development-only auth bypass.
 * Requires BOTH: NODE_ENV=development AND DEV_BYPASS_AUTH=true.
 * This can never fire in production even if the env var is accidentally set.
 */
export function isDevBypass(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.DEV_BYPASS_AUTH === "true"
  );
}
