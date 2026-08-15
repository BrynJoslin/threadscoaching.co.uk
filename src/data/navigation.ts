export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation = [
  { label: 'Coaching', href: '/coaching' },
  { label: 'Teams', href: '/team-workshops' },
  { label: 'Speaking', href: '/public-speaking' },
  { label: 'About', href: '/about' },
] as const satisfies readonly NavigationItem[];

export const footerNavigation = [
  ...primaryNavigation,
  { label: 'Personality coaching', href: '/personality-discover-develop' },
  { label: 'Body Soul Spirit Reset', href: '/body-soul-spirit-reset' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
] as const satisfies readonly NavigationItem[];
