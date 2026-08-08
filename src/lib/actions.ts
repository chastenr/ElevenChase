"use server";

import { sendContactNotification } from "@/lib/mail";
import type { ContactFormState } from "@/lib/contact-types";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !budget || !message) {
    return {
      status: "error",
      message:
        "Please fill in your name, email, budget and a short description.",
    };
  }

  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const { delivered } = await sendContactNotification({
    name,
    email,
    company: company || undefined,
    projectType: projectType || undefined,
    budget,
    message,
  });

  if (!delivered) {
    return {
      status: "unconfigured",
      message:
        "Thanks — your message was received. Email delivery isn't connected on this deployment yet, so please also reach out directly in the meantime.",
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out — we'll get back to you shortly.",
  };
}
