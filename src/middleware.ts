import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { isRouteAllowed } from "./utils/routeGuard";
import { routeRoles } from "./config/route";

export async function middleware(req: NextRequest) {
  // Get the token and role from the current session
  const token = await auth();
  const userRole = token?.user?.role != undefined ? token?.user?.role : '';
  const { pathname } = req.nextUrl;

  // Check if the user is allowed to access the route
  if (!isRouteAllowed(pathname, userRole, routeRoles)) {
    // Redirect to login page if the user role is not allowed to access the route
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // If the user is allowed, continue
  return NextResponse.next();
}