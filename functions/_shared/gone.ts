const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; upgrade-insecure-requests",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), picture-in-picture=(), usb=()',
  'X-Frame-Options': 'DENY',
};

export const permanentlyGone = () =>
  new Response(
    '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>Page no longer available | Threads Coaching</title></head><body><main><h1>Page no longer available</h1><p>This page has been permanently removed.</p><p><a href="/">Return to Threads Coaching</a></p></main></body></html>',
    {
      status: 410,
      headers: {
        ...securityHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
