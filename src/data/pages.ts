export type PageDefinition = {
  path: string;
  title: string;
  description: string;
  indexable: boolean;
};

export const pages = [
  {
    path: '/',
    title: 'Life, Leadership & Christian Coaching | Threads Coaching',
    description:
      'Warm, practical coaching for individuals and teams seeking greater clarity, confidence and purposeful change.',
    indexable: true,
  },
  {
    path: '/one-to-one-sessions',
    title: 'One-to-One Life & Leadership Coaching | Threads Coaching',
    description:
      'One-to-one coaching for clearer, more courageous next steps in life, leadership, calling and change.',
    indexable: true,
  },
  {
    path: '/personality-discover-develop',
    title: 'Personality Coaching: Discover & Develop | Threads Coaching',
    description:
      'Understand your personality and build a practical development plan through focused coaching with Threads Coaching.',
    indexable: true,
  },
  {
    path: '/team-workshops',
    title: 'Team Coaching & Workshops | Threads Coaching',
    description:
      'Team coaching and workshops for reflective practice, healthier collaboration and values-led culture.',
    indexable: true,
  },
  {
    path: '/body-soul-spirit-reset',
    title: 'Body Soul Spirit Reset Coaching | Threads Coaching',
    description:
      'Faith-aware, whole-person coaching for people seeking greater integration, confidence and healthier next steps.',
    indexable: true,
  },
  {
    path: '/public-speaking',
    title: 'Public Speaking & Preaching | Threads Coaching',
    description:
      'Speaking and preaching that helps audiences connect inspiration with thoughtful, practical action.',
    indexable: true,
  },
  {
    path: '/about',
    title: 'About Joy & Paul | Threads Coaching',
    description:
      'Meet Joy and Paul, the coaches behind Threads Coaching, and discover their faith-aware, practical approach.',
    indexable: true,
  },
  {
    path: '/contact',
    title: 'Contact Threads Coaching',
    description:
      'Start a conversation with Threads Coaching about individual coaching, teams, workshops or speaking.',
    indexable: true,
  },
  {
    path: '/privacy',
    title: 'Privacy Notice | Threads Coaching',
    description: 'How Threads Coaching handles personal information.',
    indexable: false,
  },
] as const satisfies readonly PageDefinition[];

export const indexablePages = pages.filter((page) => page.indexable);

export function getPage(path: string) {
  return pages.find((page) => page.path === path);
}
