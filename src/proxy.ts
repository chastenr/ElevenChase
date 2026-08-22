import { NextResponse, type NextRequest } from "next/server";
import { localeFromPathname } from "@/i18n/routing";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "x-elevenchase-locale",
    localeFromPathname(request.nextUrl.pathname),
  );

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|txt|xml)$).*)"],
};

