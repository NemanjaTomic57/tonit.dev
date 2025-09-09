import { NextRequest, NextResponse } from "next/server";
import { routes } from "./routes";

export default async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const isAdminPath =
        url.pathname.startsWith(routes.admin) &&
        url.pathname !== "/admin/login";

    const jwt = request.cookies.get("jwt")?.value;

    if (isAdminPath && !jwt) {
        // Redirect to /admin/login if user is not authenticated
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
