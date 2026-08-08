export type ContactFormState = {
  status: "idle" | "success" | "unconfigured" | "error";
  message: string;
};
