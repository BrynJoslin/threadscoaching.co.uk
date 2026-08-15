export type Testimonial = {
  quote: string;
  attribution?: string;
  context?: string;
};

export const testimonials = [
  {
    quote:
      'Joy enabled me to learn more about myself and how I approach life, to consider my values, goals and intentions and to move forward with more clarity and understanding.',
    attribution: 'Coaching client',
  },
  {
    quote:
      'Coaching was incredibly helpful in supporting me through some big business decisions and also facilitated the development of some big picture ideas and values to shape my work going forward.',
    attribution: 'Coaching client',
  },
  {
    quote:
      'I began Life Coaching with Joy at the start of a career transition. Coaching helped me find the clarity and courage to step into my dreams.',
    attribution: 'Coaching client',
  },
] as const satisfies readonly Testimonial[];
