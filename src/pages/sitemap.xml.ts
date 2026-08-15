import type { APIRoute } from 'astro';
import { isProduction, site } from '../config/site';
import { indexablePages } from '../data/pages';

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[
      character
    ]!,
  );

export const GET: APIRoute = () => {
  const urls = isProduction
    ? indexablePages
        .map((page) => `<url><loc>${escapeXml(new URL(page.path, site.origin).toString())}</loc></url>`)
        .join('')
    : '';

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
