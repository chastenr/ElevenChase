export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  photo?: string;
  linkedinUrl?: string;
  companyUrl?: string;
};

// TODO: Replace with approved client testimonials as they become available.
// This array is intentionally empty — the website must never show
// fabricated testimonial content. The Testimonials section (see
// src/components/sections/Testimonials.tsx) does not render at all while
// this is empty, rather than showing placeholder/fake quotes.
export const TESTIMONIALS: Testimonial[] = [];
