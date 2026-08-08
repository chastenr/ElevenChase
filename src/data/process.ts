export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "P·01",
    title: "Understand",
    description: "Understand the problem, goals, users and constraints.",
  },
  {
    index: "P·02",
    title: "Design",
    description:
      "Define the experience, architecture and technical direction.",
  },
  {
    index: "P·03",
    title: "Build",
    description: "Work in focused development cycles with visible progress.",
  },
  {
    index: "P·04",
    title: "Ship",
    description:
      "Deploy production-ready software, measure performance and keep improving.",
  },
];
