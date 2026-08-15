import type { APIRoute } from 'astro';
import { isProduction, site } from '../config/site';

export const GET: APIRoute = () => {
  const body = isProduction
    ? `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
