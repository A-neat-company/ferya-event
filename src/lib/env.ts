/**
 * Typed environment variable access.
 *
 * - Server-only vars are accessed via `env.server.*`
 * - Public (client-safe) vars are accessed via `env.public.*`
 * - In production builds, missing required vars cause the build to fail.
 * - In development, missing vars return empty strings so the app still starts.
 */

const isProduction = process.env.VERCEL_ENV === "production";
const isBuildTime = process.env.NODE_ENV === "production";

function required(name: string, value: string | undefined): string {
  if (isBuildTime && isProduction && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

function optional(value: string | undefined, fallback: string = ""): string {
  return value ?? fallback;
}

export const env = {
  /** Vercel-injected environment: "development" | "preview" | "production" */
  VERCEL_ENV: optional(process.env.VERCEL_ENV, "development"),

  /** Whether Square is in sandbox mode */
  isSquareSandbox:
    optional(process.env.SQUARE_ENVIRONMENT, "sandbox") === "sandbox",

  server: {
    SQUARE_ACCESS_TOKEN: required(
      "SQUARE_ACCESS_TOKEN",
      process.env.SQUARE_ACCESS_TOKEN
    ),
    SQUARE_APPLICATION_ID: required(
      "SQUARE_APPLICATION_ID",
      process.env.SQUARE_APPLICATION_ID
    ),
    SQUARE_LOCATION_ID: required(
      "SQUARE_LOCATION_ID",
      process.env.SQUARE_LOCATION_ID
    ),
    SQUARE_ENVIRONMENT: optional(process.env.SQUARE_ENVIRONMENT, "sandbox") as
      | "sandbox"
      | "production",

    RESEND_API_KEY: required("RESEND_API_KEY", process.env.RESEND_API_KEY),

    CLICKUP_API_TOKEN: required(
      "CLICKUP_API_TOKEN",
      process.env.CLICKUP_API_TOKEN
    ),
    CLICKUP_LIST_ID: required("CLICKUP_LIST_ID", process.env.CLICKUP_LIST_ID),

    TURNSTILE_SECRET_KEY: required(
      "TURNSTILE_SECRET_KEY",
      process.env.TURNSTILE_SECRET_KEY
    ),
  },

  public: {
    TURNSTILE_SITE_KEY: optional(
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      ""
    ),
  },
} as const;
