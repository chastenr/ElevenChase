export type Principle = {
  index: string;
  title: string;
  detail: string;
};

export const PRINCIPLES: Principle[] = [
  {
    index: "01",
    title: "Build for humans.",
    detail: "Every decision starts with the person who has to use it.",
  },
  {
    index: "02",
    title: "Keep complexity intentional.",
    detail: "We default to simple, and only add complexity that earns its place.",
  },
  {
    index: "03",
    title: "Ship working software.",
    detail: "Progress means something is running in production, not just planned.",
  },
  {
    index: "04",
    title: "Own the outcome.",
    detail: "We're accountable for results, not just for the tasks we complete.",
  },
  {
    index: "05",
    title: "Design for change.",
    detail: "Requirements evolve, so we architect systems that can evolve with them.",
  },
];
