export type Redirect = {
  from: string;
  to: string;
  status: 301;
};

export const redirects = [
  { from: '/more-about-me', to: '/about', status: 301 },
  { from: '/my-approach', to: '/about', status: 301 },
  {
    from: '/s-projects-side-by-side',
    to: '/body-soul-spirit-reset',
    status: 301,
  },
] as const satisfies readonly Redirect[];

export const gonePaths = [
  '/feed',
  '/events-page',
  '/pages-sitemap.xml',
  '/member-profile_p_first-chunk-sitemap.xml',
] as const;

export const gonePathVariants = gonePaths.flatMap((path) =>
  path.endsWith('.xml') ? [path] : [path, `${path}/`],
);
