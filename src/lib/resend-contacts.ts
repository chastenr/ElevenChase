export type MarketingContact = {
  name: string;
  email: string;
};

export type ContactSyncResult =
  | { status: "created" }
  | { status: "existing" }
  | { status: "failed"; phase: "lookup" | "create"; httpStatus?: number };

type FetchImplementation = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

const RESEND_CONTACTS_API_URL = "https://api.resend.com/contacts";

function splitContactName(name: string) {
  const [firstName = "", ...remainingNames] = name.trim().split(/\s+/);
  return { firstName, lastName: remainingNames.join(" ") };
}

/**
 * Creates a Resend Contact only when one does not already exist. Existing
 * contacts are never updated, which preserves a prior global unsubscribe.
 */
export async function syncResendContact(
  apiKey: string,
  { name, email }: MarketingContact,
  fetchImplementation: FetchImplementation = fetch,
): Promise<ContactSyncResult> {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  try {
    const existingContact = await fetchImplementation(
      `${RESEND_CONTACTS_API_URL}/${encodeURIComponent(email)}`,
      { headers },
    );

    if (existingContact.ok) {
      return { status: "existing" };
    }

    if (existingContact.status !== 404) {
      return {
        status: "failed",
        phase: "lookup",
        httpStatus: existingContact.status,
      };
    }

    const { firstName, lastName } = splitContactName(name);
    const createdContact = await fetchImplementation(RESEND_CONTACTS_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        first_name: firstName,
        ...(lastName ? { last_name: lastName } : {}),
        unsubscribed: false,
      }),
    });

    if (createdContact.ok) {
      return { status: "created" };
    }

    // Another request may have created the same global contact between the
    // lookup and create calls. Do not update it or treat that race as failure.
    if (createdContact.status === 409) {
      return { status: "existing" };
    }

    return {
      status: "failed",
      phase: "create",
      httpStatus: createdContact.status,
    };
  } catch {
    return { status: "failed", phase: "lookup" };
  }
}
