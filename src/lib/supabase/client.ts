import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

/**
 * Supabase client for Client Components. Safe to call from the browser —
 * only the anon key (subject to RLS) is used.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
