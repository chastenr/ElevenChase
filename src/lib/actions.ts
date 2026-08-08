"use server";

import { sendContactNotification } from "@/lib/mail";
import type { ContactFormState } from "@/lib/contact-types";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema, auditSchema, isBotSubmission } from "@/lib/form-security";

const GENERIC_ERROR: ContactFormState = {
  status: "error",
  message: "Something went wrong. Please try again.",
};

const RATE_LIMITED_ERROR: ContactFormState = {
  status: "error",
  message: "Too many submissions. Please try again in a little while.",
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (isBotSubmission(formData)) {
    return GENERIC_ERROR;
  }

  const { allowed } = await checkRateLimit();
  if (!allowed) {
    return RATE_LIMITED_ERROR;
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    website: formData.get("website") ?? "",
    projectType: formData.get("projectType") ?? "",
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ??
        "Please check your details and try again.",
    };
  }

  const { name, email, company, website, projectType, message } = parsed.data;

  const { delivered } = await sendContactNotification({
    formType: "project",
    name,
    email,
    company: company || undefined,
    website: website || undefined,
    projectType: projectType || undefined,
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
  if (isBotSubmission(formData)) {
    return GENERIC_ERROR;
  }

  const { allowed } = await checkRateLimit();
  if (!allowed) {
    return RATE_LIMITED_ERROR;
  }

  const improvementAreasRaw = formData
    .getAll("improvementAreas")
    .map((value) => String(value));

  const parsed = auditSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    website: formData.get("website") ?? "",
    improvementAreas: improvementAreasRaw,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ??
        "Please fill in your name, email and website URL.",
    };
  }

  const { name, email, company, website, improvementAreas } = parsed.data;

  const { delivered } = await sendContactNotification({
    formType: "audit",
    name,
    email,
    company: company || undefined,
    website,
    improvementAreas: improvementAreas.length
      ? improvementAreas.join(", ")
      : undefined,
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
