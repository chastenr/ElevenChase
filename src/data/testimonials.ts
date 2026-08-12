export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  photo?: string;
  isPlaceholder?: boolean;
  linkedinUrl?: string;
  companyUrl?: string;
};

// TODO: Replace this sample with the client's approved name, role, company,
// portrait and exact feedback before treating it as a real testimonial.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Working with ElevenChase was such a smooth experience. They understood what we needed, kept everything clear, and delivered something we're genuinely happy with.",
    name: "Bianca R.",
    title: "Founder",
    company: "Pilates studio",
    photo: "/bianca-placeholder.jpg",
    isPlaceholder: true,
  },
  {
    quote:
      "The whole process felt easy from the beginning. We always knew what was happening, and the final result was even better than we imagined.",
    name: "Aisha M.",
    title: "Founder",
    company: "Service business",
    photo: "/testimonial-02.jpg",
    isPlaceholder: true,
  },
  {
    quote:
      "They really listened to our ideas and turned them into something simple, polished, and easy for our team to use every day.",
    name: "Daniel K.",
    title: "Operations lead",
    company: "Growing company",
    photo: "/testimonial-03.jpg",
    isPlaceholder: true,
  },
  {
    quote:
      "Communication was always clear and thoughtful. We felt supported throughout the project and are very happy with how everything came together.",
    name: "Priya S.",
    title: "Business owner",
    company: "Local business",
    photo: "/testimonial-04.jpg",
    isPlaceholder: true,
  },
  {
    quote:
      "Working together was straightforward and stress-free. They understood the bigger picture and paid attention to all the small details too.",
    name: "Mark T.",
    title: "Co-founder",
    company: "Digital business",
    photo: "/testimonial-05.jpg",
    isPlaceholder: true,
  },
  {
    quote:
      "We appreciated how responsive and reliable they were. The finished product feels professional, easy to manage, and ready for us to grow.",
    name: "Mei L.",
    title: "Director",
    company: "Professional services",
    photo: "/testimonial-06.jpg",
    isPlaceholder: true,
  },
  {
    quote:
      "From the first conversation to launch, everything was handled with care. It felt like working with a partner who genuinely wanted us to succeed.",
    name: "Carlos A.",
    title: "Founder",
    company: "Independent brand",
    photo: "/testimonial-07.jpg",
    isPlaceholder: true,
  },
];
