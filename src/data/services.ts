export type Service = {
  title: string;
  href: string;
  summary?: string;
  /** Compatibility alias for concise hand-authored page cards. */
  text?: string;
  cta?: string;
};

export const services = [
  {
    title: 'One-to-one coaching',
    href: '/one-to-one-sessions',
    summary:
      'Space to find a clearer, more courageous next step in life, leadership, calling or change.',
    cta: 'Explore one-to-one coaching',
  },
  {
    title: 'Personality coaching',
    href: '/personality-discover-develop',
    summary:
      'Understand your patterns and build a development plan that fits how you naturally work.',
    cta: 'Explore personality coaching',
  },
  {
    title: 'Teams and workshops',
    href: '/team-workshops',
    summary:
      'Help your team strengthen connection, reflection and values-led ways of working.',
    cta: 'Explore team workshops',
  },
  {
    title: 'Body Soul Spirit Reset',
    href: '/body-soul-spirit-reset',
    summary:
      'Bring body, soul and spirit back into one honest conversation.',
    cta: 'Explore Body Soul Spirit Reset',
  },
  {
    title: 'Speaking and preaching',
    href: '/public-speaking',
    summary:
      'Thoughtful, engaging communication that helps people move from inspiration to action.',
    cta: 'Enquire about speaking',
  },
] as const satisfies readonly Service[];
