import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { syncResendContact } from "../src/lib/resend-contacts.ts";

const CONTACT = { name: "John Smith", email: "john@company.com" };

describe("syncResendContact", () => {
  test("creates a new subscribed contact with split name fields", async () => {
    const calls: Array<{ input: string; init?: RequestInit }> = [];
    const responses = [new Response(null, { status: 404 }), Response.json({})];
    const fetchMock = async (input: string | URL | Request, init?: RequestInit) => {
      calls.push({ input: String(input), init });
      return responses.shift()!;
    };

    const result = await syncResendContact("test-key", CONTACT, fetchMock);

    assert.deepEqual(result, { status: "created" });
    assert.equal(calls.length, 2);
    assert.equal(calls[1]?.input, "https://api.resend.com/contacts");
    assert.deepEqual(JSON.parse(String(calls[1]?.init?.body)), {
      email: "john@company.com",
      first_name: "John",
      last_name: "Smith",
      unsubscribed: false,
    });
  });

  test("does not create or update an existing contact", async () => {
    let callCount = 0;
    const fetchMock = async () => {
      callCount += 1;
      return Response.json({ unsubscribed: true });
    };

    const result = await syncResendContact("test-key", CONTACT, fetchMock);

    assert.deepEqual(result, { status: "existing" });
    assert.equal(callCount, 1);
  });

  test("treats a duplicate conflict during creation as existing", async () => {
    const responses = [
      new Response(null, { status: 404 }),
      new Response(null, { status: 409 }),
    ];
    const fetchMock = async () => responses.shift()!;

    const result = await syncResendContact("test-key", CONTACT, fetchMock);
    assert.deepEqual(result, { status: "existing" });
  });

  test("returns a safe failure when contact creation fails", async () => {
    const responses = [
      new Response(null, { status: 404 }),
      new Response(null, { status: 500 }),
    ];
    const fetchMock = async () => responses.shift()!;

    const result = await syncResendContact("test-key", CONTACT, fetchMock);
    assert.deepEqual(result, {
      status: "failed",
      phase: "create",
      httpStatus: 500,
    });
  });
});
