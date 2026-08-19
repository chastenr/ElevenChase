import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

/**
 * Supabase client for Server Components, Server Functions, and Route
 * Handlers. Uses the anon key — all access still goes through RLS.
 *
 * Cookie writes are only possible from a Server Function or Route Handler;
 * calling `.set`/`.delete` from a Server Component is a no-op guarded by
 * the try/catch below (Next.js refreshes the session via middleware).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component render — session refresh is
            // handled by middleware instead.
          }
        },
      },
    },
  );
}
