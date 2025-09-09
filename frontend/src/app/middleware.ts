import { NextRequest, NextResponse } from "next/server";
import { routes } from "./routes";
import axios from "axios";
import { apiUrl } from "./environment";

export default async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const isAdminPath =
        url.pathname.startsWith(routes.admin) &&
        url.pathname !== "/admin/login";

    const isAuthenticated = await axios.get(apiUrl + "admin/auth-status", {
        withCredentials: true,
    });
    console.log(isAuthenticated.data.isAuthenticated);

    if (isAdminPath && !isAuthenticated) {
        // Redirect to /admin/login if user is not authenticated
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
