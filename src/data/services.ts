export type Service = {
  title: string;
  href: string;
  tag?: string;
  summary?: string;
  /** Compatibility alias for concise hand-authored page cards. */
  text?: string;
  cta?: string;
  points?: readonly string[];
};

export const services = [
  {
    title: 'One-to-one life & leadership coaching',
    href: '/one-to-one-sessions',
    tag: 'With Joy',
    summary:
      'For people who feel called to lead change and want greater clarity, confidence and alignment between their values, faith and leadership.',
    cta: 'Explore one-to-one coaching',
    points: ['Purpose and calling discernment', 'Leadership obstacles and confidence', 'Values, goals and relationships', 'Spiritual direction for Christian leaders'],
  },
  {
    title: 'Identity, faith & holistic coaching',
    href: '/body-soul-spirit-reset',
    tag: 'With Paul',
    summary:
      'For people who want to live from a deeper sense of identity and pursue wholeness across body, soul and spirit.',
    cta: 'Explore holistic coaching',
    points: ['Identity and purpose', 'Discipleship and everyday faith', 'Inner healing, prayer and reflection', 'Practical goals towards greater wholeness'],
  },
  {
    title: 'Understand your unique wiring',
    href: '/personality-discover-develop',
    tag: 'Discover & develop',
    summary:
      'Explore your personality through Jungian cognitive functions and the 16 personalities framework, then turn the insight into a personal development plan.',
    cta: 'Explore personality coaching',
    points: ['One-off personality discovery session', 'Five-session development package', 'Strengths, blind spots and growth'],
  },
  {
    title: 'Build a healthier, more aligned team',
    href: '/team-workshops',
    tag: 'Teams',
    summary:
      'We help teams move from good intentions to shared practice through values work, reflective coaching and strengths-based workshops.',
    cta: 'Explore team workshops',
    points: ['Team and group coaching', 'Working Genius workshops', 'Organisational values curation'],
  },
] as const satisfies readonly Service[];
