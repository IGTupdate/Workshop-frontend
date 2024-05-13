import createIntlMiddleware from "next-intl/middleware";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { defaultLocale, locales } from "./i18n"; // Assuming you have a file exporting supported locales

// Define a custom middleware function
function customMiddleware(request: NextRequest) {
  // Get cookies from the request
  const cookieStore = cookies();

  // Extract refresh token and isEmployee from cookies
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const isEmployee = cookieStore.get("isEmployee")?.value;

  const pathname = request.nextUrl.pathname;

  // Middleware logic
  if (pathname.includes("/employee/dashboard")) {
    // Check access to /employee/dashboard route
    if (refreshToken && isEmployee) {
      // Allow access for authenticated employees
      request.nextUrl.pathname = pathname;
    } else if (refreshToken && !isEmployee) {
      // Redirect non-employee users to /dashboard
      request.nextUrl.pathname = "/dashboard";
    } else {
      // Redirect unauthorized users to /employee/login
      request.nextUrl.pathname = "/employee/login";
    }
  } else if (pathname.includes("/dashboard")) {
    // Check access to /dashboard route
    if (refreshToken && !isEmployee) {
      // Allow access for authenticated non-employee users
      request.nextUrl.pathname = pathname;
    } else if (refreshToken && isEmployee) {
      // Redirect employee users to /employee/dashboard
      request.nextUrl.pathname = "/employee/dashboard";
    } else {
      // Redirect unauthorized users to /login
      const redirectUrl =
        pathname + "?" + request.nextUrl.searchParams.toString();
      request.nextUrl.pathname = "/login";
      request.nextUrl.searchParams.append("redirectUrl", redirectUrl);
    }
  } else if (pathname.includes("/employee/login")) {
    // Check access to /employee/login route
    if (!refreshToken) {
      // Allow access for unauthenticated users
      request.nextUrl.pathname = pathname;
    } else {
      // Redirect authenticated employee users to /employee/dashboard
      // Redirect authenticated non-employee users to /dashboard
      request.nextUrl.pathname = isEmployee
        ? "/employee/dashboard"
        : "/dashboard";
    }
  } else if (pathname.includes("/login")) {
    // Check access to /login route
    if (!refreshToken) {
      // Allow access for unauthenticated users
      request.nextUrl.pathname = pathname;
    } else {
      // Redirect authenticated employee users to /employee/dashboard
      // Redirect authenticated non-employee users to /dashboard
      request.nextUrl.pathname = isEmployee
        ? "/employee/dashboard"
        : "/dashboard";
    }
  }

  return request; // Return the modified request
}

// Define the main middleware function
export default async function middleware(request: NextRequest) {
  // Apply custom middleware logic
  const modifiedRequest = customMiddleware(request);

  // Initialize internationalization middleware with supported locales and default locale
  const handleI18nRouting = createIntlMiddleware({
    locales: locales,
    defaultLocale: defaultLocale, // Assuming the first locale is the default one
  });

  // Apply internationalization middleware with the modified request
  return handleI18nRouting(modifiedRequest);
}

// Export configuration for i18n middleware
export const config = {
  matcher: [
    // Match all pathnames except for:
    // - those starting with `/api`, `/_next`, or `/_vercel`
    // - those containing a dot (e.g., `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // Match all pathnames within `/users`, optionally with a locale prefix
    "/([\\w-]+)?/users/(.+)",
  ],
};
