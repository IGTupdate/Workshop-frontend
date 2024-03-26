import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  return NextResponse.next();
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  const redirectUrl = (location: string) => {
    return NextResponse.redirect(new URL(location, request.url));
  };

  // Check if the user is trying to access /employee/dashboard
  if (pathname === "/employee/dashboard") {
    if (refreshToken) {
      // User has a refresh token, allow access
      return NextResponse.next();
    } else {
      // User doesn't have a refresh token, redirect to login
      return redirectUrl("/employee/login");
    }
  }

  // Check if the user is trying to access /dashboard
  if (pathname === "/dashboard") {
    if (refreshToken) {
      // User has a refresh token, allow access
      return NextResponse.next();
    } else {
      // User doesn't have a refresh token, redirect to login
      return redirectUrl("/login");
    }
  }

  // Check if the user is trying to access /employee/login
  if (pathname === "/employee/login") {
    if (!refreshToken) {
      // User doesn't have a refresh token, allow access
      return NextResponse.next();
    } else {
      // User has a refresh token, redirect to employee dashboard
      return redirectUrl("/employee/dashboard");
    }
  }

  // Check if the user is trying to access /login
  if (pathname === "/login") {
    if (!refreshToken) {
      // User doesn't have a refresh token, allow access
      return NextResponse.next();
    } else {
      // User has a refresh token, redirect to dashboard
      return redirectUrl("/dashboard");
    }
  }

  // For any other routes, allow access
  return NextResponse.next();
}
