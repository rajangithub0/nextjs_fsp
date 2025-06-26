import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next();
    }, {
    callbacks: {
        authorized: ({ req, token }) => {
            const { pathname } = req.nextUrl
            if (
                pathname.startsWith("/api/auth") ||
                pathname === "/login" ||
                pathname === "/register"
            )
                return true;

            if (pathname === "/" || pathname.startsWith("/api/videos")) {
                return true;
            }

            return !!token
            //if there is a token , the user is authenticated
            //if there is no token, the user is not authenticated
        },
    }
}
);

export const config = {
    matcher: [
        // Match all request path expect:
        /*
            - /api/auth (NextAuth.js routes)
            - /_next/static (Next.js static files)
            - /_next/image (Next.js image optimization)
            - /favicon.ico (favicon file)
            - /login (login page, no auth required)
            - /register (register page, no auth required)
        */
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
};