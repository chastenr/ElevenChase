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
  const website = String(formData.get("website") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email and a short description.",
    };
  }

  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const { delivered } = await sendContactNotification({
    formType: "project",
    name,
    email,
    company: company || undefined,
    website: website || undefined,
    projectType: projectType || undefined,
    budget: budget || undefined,
    message,
  });

  if (!delivered) {
    return {
      status: "unconfigured",
      message:
        "Thanks, your message was received. Email delivery isn't connected on this deployment yet, so please also reach out directly in the meantime.",
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out. We'll get back to you shortly.",
  };
}

export async function submitAuditRequest(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const improvementAreas = formData
    .getAll("improvementAreas")
    .map((v) => String(v))
    .filter(Boolean)
    .join(", ");

  if (!name || !email || !website) {
    return {
      status: "error",
      message: "Please fill in your name, email and website URL.",
    };
  }

  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const { delivered } = await sendContactNotification({
    formType: "audit",
    name,
    email,
    company: company || undefined,
    website,
    improvementAreas: improvementAreas || undefined,
  });

  if (!delivered) {
    return {
      status: "unconfigured",
      message:
        "Thanks, your request was received. Email delivery isn't connected on this deployment yet, so please also reach out directly in the meantime.",
    };
  }

  return {
    status: "success",
    message: "Thanks. We'll take a look and follow up with what we find.",
  };
}
