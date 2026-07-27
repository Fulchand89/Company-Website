import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect admin routes except login and reset-password
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && pathname !== "/admin/reset-password") {
    const cookieName = process.env.SESSION_COOKIE_NAME || "gtw_session";
    const sessionCookie = request.cookies.get(cookieName);

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Decode and parse the session cookie JSON
      const decodedValue = decodeURIComponent(sessionCookie.value);
      const session = JSON.parse(decodedValue);

      // Check role and expiration
      if (session.role !== "admin" || (session.exp && Date.now() / 1000 > session.exp)) {
        // Clear expired or invalid session and redirect
        const response = NextResponse.redirect(new URL("/admin/login", request.url));
        response.cookies.delete(cookieName);
        return response;
      }
    } catch (error) {
      console.error("Middleware Session Parsing Error:", error);
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(cookieName);
      return response;
    }
  }

  return NextResponse.next();

}

// Only match admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
