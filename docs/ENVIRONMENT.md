# Environment configuration

`.env.example` is the canonical key inventory. It contains names and classifications only; never commit values.

## Required core

| Variable | Purpose | Failure when absent |
|---|---|---|
| `JWT_SECRET` | Sign and verify session cookies | Authentication cannot issue/verify sessions |
| `SUPABASE_URL` | Backend data API endpoint | Backend data access fails |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only data credential | Backend data access fails |
| `STRIPE_SECRET_KEY` | Real checkout and billing | Payment endpoints return `503` |
| `STRIPE_WEBHOOK_SECRET` | Verify Stripe events | Stripe webhook returns `503` |

Stripe is required for production because ROBIN's current payment flow is real-only. It can be absent locally when payment paths are not exercised.

## Conditional groups

| Integration | Variables | Requirement |
|---|---|---|
| Anthropic | `ANTHROPIC_API_KEY`, optional `ANTHROPIC_MODEL` | Required for chat, OCR and CV analysis |
| Resend | `RESEND_API_KEY`, optional `RESEND_FROM`, `SUPPORT_INBOXES`, `TEAM_EMAIL` | Without an API key email is not delivered; inbox variables override operational recipients |
| Drive/Sheets | shared Google OAuth variables and global `GOOGLE_REFRESH_TOKEN` | Required only when those synchronizations are enabled |
| Calendar/Meet | shared Google OAuth plus one refresh token per advisor | Required for booking and transcript access for that advisor |
| Meet ingestion | `MEET_WEBHOOK_SECRET`, optional lookback | Secret required for HTTP webhook and health; lookback configures the scheduled poll |
| Notion | verification token or shared webhook secret | At least one authentication method; bootstrap password only for user creation |
| Holded | `HOLDED_API_PAT` and optional account overrides | Optional invoice integration |

## Netlify-provided

`CONTEXT`, `URL`, `DEPLOY_PRIME_URL` and `DEPLOY_URL` are intentionally omitted from `.env.example` because Netlify injects them.

## Optional application configuration

- `ALLOWED_ORIGINS` extends automatically derived same-site origins.
- `PUBLIC_BASE_URL` overrides the public URL used in messages.
- bucket variables override existing names; code does not create buckets.
- booking variables define the Calendar window title, slot duration and maximum
  horizon; their validated behavior is documented in `BOOKING_CONFIGURATION.md`.
- Stripe Price IDs are optional; without them checkout uses inline recurring price data.

## Verification

Run `node scripts/check-env-example.js`. It compares direct and declared dynamic references with `.env.example`, excluding variables supplied by Netlify.
