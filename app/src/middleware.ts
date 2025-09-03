import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.pathname;

    if (url.startsWith("/api/log") || url.startsWith("/_next/") || url.includes(".ico") || url.includes(".png")) {
      return NextResponse.next();
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    fetch(`${req.nextUrl.origin}/api/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, ip }),
    }).catch((err) =>
      console.error("Błąd wysyłania logu do API:", err)
    );
  } catch (err) {
    console.error("Błąd w middleware:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/log|_next).*)"], 
};
