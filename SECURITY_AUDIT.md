# GoReallyBig Production Readiness & Security Audit

## Scope

Static review of the GoReallyBig landing-page package used for the current production candidate.

This is a code/configuration review, not a penetration test, vulnerability scan of the deployed domain, or third-party dependency audit.

## Security controls applied

- Moved all executable JavaScript out of `index.html` into same-origin `assets/app.js`.
- Removed the remaining `innerHTML` use from the contact-form success path and replaced it with DOM node creation and `textContent`.
- Added Cloudflare Pages `_headers` configuration with:
  - Content Security Policy
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - restrictive `Permissions-Policy`
  - `X-Permitted-Cross-Domain-Policies: none`
- CSP blocks executable inline JavaScript and plugin/object content, restricts framing, limits form targets to the site origin, permits the configured Google Apps Script connection, and upgrades insecure requests.
- Google Fonts is explicitly allow-listed because it is currently an intentional external dependency.
- Added `noopener noreferrer` to links opened with `target="_blank"`.
- Confirmed there are no executable external scripts in the current HTML.
- Confirmed there are no `eval()`, `new Function()`, or `document.write()` calls. The lead forms use one controlled `fetch()` POST to the configured Google Apps Script endpoint; no arbitrary URL input is used for the request destination.
- Confirmed all locally referenced assets resolve to files in the package.
- Lead forms now POST URL-encoded submissions to the configured GoReallyBig Google Apps Script web-app endpoint. No API key or other secret is stored in the frontend.
- Kept HSTS out of the package intentionally. It should be enabled at the production Cloudflare/domain layer after HTTPS and the final domain configuration are confirmed.

## Form/security boundary

The frontend performs usability validation, but client-side validation is not treated as a security control. The Google Apps Script endpoint is the backend boundary and must validate and handle submitted fields safely. The endpoint URL is not a secret and is intentionally embedded in the public frontend.

If forms are later connected to email, a CRM, database, automation service, or API, the backend must add server-side validation, output encoding/sanitisation where applicable, rate limiting/abuse controls, spam protection, appropriate CSRF protection, secure secret handling, and privacy/data-retention controls.

## Static review results

- Local asset reference check: PASS
- Inline executable JavaScript check: PASS
- Dangerous JavaScript pattern check: PASS
- External executable script check: PASS
- `target="_blank"` link hardening: PASS
- CSP/header configuration present: PASS
- JSON-LD retained: PASS
- No credentials/API keys identified in the reviewed package: PASS

## Known non-security launch items

These are not silently changed by this audit and should be handled during final production acceptance:

- Social links currently use placeholder `#` destinations and should be replaced with real profiles before launch if social links are intended to be active.
- The site should be tested on the final HTTPS production URL after Cloudflare deployment.
- Browser console/CSP reports should be checked after deployment to confirm that all intended resources are allowed and no accidental third-party dependency has been introduced.
- If Cloudflare Web Analytics, Turnstile, Rocket Loader, or other Cloudflare features are enabled later, the CSP should be reviewed against the corresponding Cloudflare requirements before enabling them.

## Acceptance position

The package is suitable to move to repository/deployment testing as the current production candidate. Further changes should be driven by actual defects, security findings, accessibility issues, performance evidence, or deliberate content/design decisions rather than continued speculative optimisation.
