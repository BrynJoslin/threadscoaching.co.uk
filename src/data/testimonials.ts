export type Testimonial = {
  quote: string;
  attribution?: string;
  context?: string;
};

export const testimonials = [
  {
    quote:
      'Joy helped me see the threads running through my story and gave me confidence to take the next step.',
    attribution: 'Coaching client',
  },
  {
    quote:
      'I left with practical clarity, a renewed sense of purpose and a much kinder way of looking at myself.',
    attribution: 'Coaching client',
  },
  {
    quote:
      'Sometimes it felt as if Joy knew me better than I knew myself. The process gave me language for things I had struggled to explain.',
    attribution: 'Personality coaching client',
  },
] as const satisfies readonly Testimonial[];
