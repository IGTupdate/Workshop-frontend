import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";



import createMiddleware from 'next-intl/middleware';

export default createMiddleware({


  // A list of all locales that are supported
  locales: ['en', 'sp'],

  // Used when no locale matches
  defaultLocale: 'en',

});



export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(sp|en)/:path*']
};





// export async function middleware(request: NextRequest) {
//   // return NextResponse.next();

//   // Get cookies from the request
//   const cookieStore = cookies();

//   // Extract refresh token and isEmployee from cookies
//   const refreshToken = cookieStore.get("refreshToken")?.value;
//   const isEmployee = cookieStore.get("isEmployee")?.value;

//   // console.log(cookieStore.get("accessToken")?.value);
//   // console.log(cookieStore.get("refreshToken")?.value);

//   // Extract pathname from the request's URL
//   const pathname = request.nextUrl.pathname;

//   // Function to generate redirect URL
//   const redirectUrl = (location: string) => {
//     return NextResponse.redirect(new URL(location, request.url));
//   };

//   // Middleware logic
//   if (pathname.includes("/employee/dashboard")) {
//     // Check access to /employee/dashboard route
//     if (refreshToken && isEmployee) {
//       return NextResponse.next(); // Allow access
//     } else if (refreshToken && !isEmployee) {
//       return redirectUrl("/dashboard"); // Redirect non-employee to /dashboard
//     } else {
//       return redirectUrl("/employee/login"); // Redirect unauthorized user to /employee/login
//     }
//   } else if (pathname.includes("/dashboard")) {
//     // Check access to /dashboard route
//     if (refreshToken && !isEmployee) {
//       return NextResponse.next(); // Allow access
//     } else if (refreshToken && isEmployee) {
//       return redirectUrl("/employee/dashboard");
//     } else {
//       return redirectUrl("/login"); // Redirect unauthorized user to /login
//     }
//   } else if (pathname.includes("/employee/login")) {
//     // Check access to /employee/login route
//     if (!refreshToken) {
//       return NextResponse.next(); // Allow access
//     } else {
//       if (isEmployee) redirectUrl("/employee/dashboard"); // Redirect authorized user to /employee/dashboard
//       return redirectUrl("/dashboard");
//     }
//   } else if (pathname.includes("/login")) {
//     // Check access to /login route
//     if (!refreshToken) {
//       return NextResponse.next(); // Allow access
//     } else {
//       if (isEmployee) return redirectUrl("/employee/dashboard"); // Redirect authorized user to /dashboard
//       return redirectUrl("/dashboard");
//     }
//   }

//   // Allow access to other routes
//   return NextResponse.next();
// }



