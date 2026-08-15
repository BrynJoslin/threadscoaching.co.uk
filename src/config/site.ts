const siteEnvironment = import.meta.env.SITE_ENV ?? 'preview';

if (siteEnvironment !== 'preview' && siteEnvironment !== 'production') {
  throw new Error(
    `SITE_ENV must be either "preview" or "production". Received: ${siteEnvironment}`,
  );
}

export const isProduction = siteEnvironment === 'production';

export const site = {
  name: 'Threads Coaching',
  shortName: 'Threads',
  origin: 'https://www.threadscoaching.co.uk',
  locale: 'en_GB',
  language: 'en-GB',
  email: 'threadscoaching@gmail.com',
  telephone: '+447739353444',
  telephoneDisplay: '+44 7739 353444',
  description:
    'Warm, practical coaching for individuals and teams seeking greater clarity, confidence and purposeful change.',
  defaultSocialImage: '/og/default.jpg',
  social: {
    instagram: 'https://www.instagram.com/joyblundell/',
    x: 'https://twitter.com/joyblundell',
  },
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, site.origin).toString();
}

export function schemaId(fragment: string) {
  return `${site.origin}/#${fragment.replace(/^#/, '')}`;
}

export type SchemaNode = Record<string, unknown>;
