/**
 * Security headers.
 *
 * This is a fully static site: no API routes, no database, no auth, no user
 * input. That removes most classes of web vulnerability by construction, so
 * these headers are about hardening what is left — framing, MIME sniffing,
 * referrer leakage and unnecessary browser capabilities.
 *
 * A strict Content-Security-Policy is intentionally NOT set here. Next's App
 * Router injects inline hydration scripts, so a useful script-src needs
 * per-request nonces via middleware; a CSP with 'unsafe-inline' would look
 * reassuring while blocking very little. See the README for that follow-up.
 */
const securityHeaders = [
  // Clickjacking: disallow this site being framed by anyone else.
  { key: "X-Frame-Options", value: "DENY" },
  // Stop browsers second-guessing declared Content-Types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin cross-site, full path same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing here needs these, so deny them outright.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Force HTTPS for a year, including subdomains.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Never ship client source maps: they hand readers the original sources.
  productionBrowserSourceMaps: false,
  // Drop the `x-powered-by: Next.js` version disclosure.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
