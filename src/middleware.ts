// import { NextResponse, NextRequest } from "next/server";
// import { cookies } from "next/headers";

// export async function middleware(request: NextRequest) {
//     return NextResponse.next();

//     // Get cookies from the request
//     const cookieStore = cookies();

//     // Extract refresh token and isEmployee from cookies
//     const refreshToken = cookieStore.get("refreshToken")?.value;
//     const isEmployee = cookieStore.get('isEmployee')?.value;

//     // console.log(cookieStore.get("accessToken")?.value);
//     // console.log(cookieStore.get("refreshToken")?.value);


//     // Extract pathname from the request's URL
//     const pathname = request.nextUrl.pathname;

//     // Function to generate redirect URL
//     const redirectUrl = (location: string) => {
//         return NextResponse.redirect(new URL(location, request.url));
//     };

//     // Middleware logic
//     if (pathname.includes("/employee/dashboard")) {
//         // Check access to /employee/dashboard route
//         if (refreshToken && isEmployee) {
//             return NextResponse.next(); // Allow access
//         } else if (refreshToken && !isEmployee) {
//             return redirectUrl('/dashboard'); // Redirect non-employee to /dashboard
//         } else {
//             return redirectUrl('/employee/login'); // Redirect unauthorized user to /employee/login
//         }
//     } else if (pathname.includes("/dashboard")) {
//         // Check access to /dashboard route
//         if (refreshToken && !isEmployee) {
//             return NextResponse.next(); // Allow access
//         } else if (refreshToken && isEmployee) {
//             return redirectUrl('/employee/dashboard');
//         } else {
//             return redirectUrl("/login"); // Redirect unauthorized user to /login
//         }
//     } else if (pathname.includes("/employee/login")) {
//         // Check access to /employee/login route
//         if (!refreshToken) {
//             return NextResponse.next(); // Allow access
//         } else {
//             if (isEmployee) redirectUrl("/employee/dashboard"); // Redirect authorized user to /employee/dashboard
//             return redirectUrl('/dashboard');
//         }
//     } else if (pathname.includes("/login")) {
//         // Check access to /login route
//         if (!refreshToken) {
//             return NextResponse.next(); // Allow access
//         } else {
//             if (isEmployee) return redirectUrl("/employee/dashboard"); // Redirect authorized user to /dashboard
//             return redirectUrl('/dashboard');
//         }
//     }

//     // Allow access to other routes
//     return NextResponse.next();
// }


// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['sp', 'en'],

//   // Used when no locale matches
//   defaultLocale: 'sp'
// });

// export const config = {
//   // Matcher entries are linked with a logical "or", therefore
//   // if one of them matches, the middleware will be invoked.
//   matcher: [
//     // Match all pathnames except for
//     // - … if they start with `/api`, `/_next` or `/_vercel`
//     // - … the ones containing a dot (e.g. `favicon.ico`)
//     '/((?!api|_next|_vercel|.*\\..*).*)',
//     // However, match all pathnames within `/users`, optionally with a locale prefix
//     '/([\\w-]+)?/users/(.+)'
//   ]
// };


// import createMiddleware from 'next-intl/middleware';
// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';

// // Define your custom middleware function
// async function customMiddleware(request: NextRequest): Promise<NextRequest> {
//     // Get cookies from the request
//     const cookieStore = cookies();

//     // Extract refresh token and isEmployee from cookies
//     const refreshToken = cookieStore.get("refreshToken")?.value;
//     const isEmployee = cookieStore.get('isEmployee')?.value;

//     // Extract pathname from the request's URL
//     const pathname = request.nextUrl.pathname;

//     // Function to generate redirect URL
//     const redirectUrl = (location: string) => {
//         return new URL(location, request.url).toString(); // Return the URL as a string
//     };

//     let shouldRedirect = false;

//     // Middleware logic
//     if (pathname.includes("/employee/dashboard")) {
//         // Check access to /employee/dashboard route
//         if (!(refreshToken && isEmployee)) {
//             shouldRedirect = true;
//         }
//     } else if (pathname.includes("/dashboard")) {
//         // Check access to /dashboard route
//         if (!(refreshToken && !isEmployee)) {
//             shouldRedirect = true;
//         }
//     } else if (pathname.includes("/employee/login")) {
//         // Check access to /employee/login route
//         if (!refreshToken) {
//             shouldRedirect = true;
//         } else {
//             if (isEmployee) request.nextUrl.pathname = "/employee/dashboard"; // Modify the request URL
//         }
//     } else if (pathname.includes("/login")) {
//         // Check access to /login route
//         if (!refreshToken) {
//             shouldRedirect = true;
//         } else {
//             if (isEmployee) request.nextUrl.pathname = "/employee/dashboard"; // Modify the request URL
//         }
//     }

//     if (shouldRedirect) {
//         // Perform redirect based on the logic
//         if (pathname.includes("/employee/dashboard")) {
//             return NextResponse.redirect('/employee/login'); // Redirect unauthorized user to /employee/login
//         } else if (pathname.includes("/dashboard")) {
//             return NextResponse.redirect("/login"); // Redirect unauthorized user to /login
//         } else if (pathname.includes("/employee/login")) {
//             return NextResponse.redirect('/dashboard');
//         } else if (pathname.includes("/login")) {
//             return NextResponse.redirect('/dashboard');
//         }
//     }

//     // If no redirection is needed, return the modified request object
//     return request;
// }

// // Create i18n middleware
// const handleIntlRouting = createMiddleware({
//     locales: ['sp', 'en'],
//     defaultLocale: 'sp'
// });

// // Define the combined middleware
// export default async function middleware(request: NextRequest | string): Promise<NextResponse> {
//     // If the argument is a string, return NextResponse.redirect
//     if (typeof request === 'string') {
//         return NextResponse.redirect(request);
//     }

//     // Execute custom middleware first
//     const modifiedRequest = await customMiddleware(request);

//     // Execute i18n middleware with the modified request
//     return handleIntlRouting(modifiedRequest);
// }


// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['en', 'sp'],

//   // Used when no locale matches
//   defaultLocale: 'sp'
// });



import createIntlMiddleware from 'next-intl/middleware';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

function customMiddleware(request: NextRequest) {

    // Get cookies from the request
    const cookieStore = cookies();

    // Extract refresh token and isEmployee from cookies
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const isEmployee = cookieStore.get('isEmployee')?.value;

    // console.log(refreshToken, isEmployee)

    const pathname = request.nextUrl.pathname
    // console.log(pathname)

    // Middleware logic
    if (pathname.includes("/employee/dashboard")) {
        // Check access to /employee/dashboard route
        if (refreshToken && isEmployee) {
            request.nextUrl.pathname = pathname // Allow access
        } else if (refreshToken && !isEmployee) {
            request.nextUrl.pathname = '/dashboard'; // Redirect non-employee to /dashboard
        } else {
            request.nextUrl.pathname = '/employee/login'; // Redirect unauthorized user to /employee/login
        }
    } else if (pathname.includes("/dashboard")) {
        // Check access to /dashboard route
        if (refreshToken && !isEmployee) {
            request.nextUrl.pathname = pathname // Allow access
        } else if (refreshToken && isEmployee) {
            request.nextUrl.pathname = '/employee/dashboard';
        } else {
            request.nextUrl.pathname = "/login"; // Redirect unauthorized user to /login
        }
    } else if (pathname.includes("/employee/login")) {
        // Check access to /employee/login route
        if (!refreshToken) {
            request.nextUrl.pathname = pathname // Allow access
        } else {
            if (isEmployee) request.nextUrl.pathname = "/employee/dashboard"; // Redirect authorized user to /employee/dashboard
            else request.nextUrl.pathname = '/dashboard';
        }
    } else if (pathname.includes("/login")) {
        // Check access to /login route
        if (!refreshToken) {
            request.nextUrl.pathname = pathname // Allow access
        } else {
            if (isEmployee) request.nextUrl.pathname = "/employee/dashboard"; // Redirect authorized user to /dashboard
            else request.nextUrl.pathname = '/dashboard';
        }
    }

    // console.log(pathname)
    return request
}

export default async function middleware(request: NextRequest) {
    const modifiedRequest = customMiddleware(request)


    const handleI18nRouting = createIntlMiddleware({
        locales: ['en', 'sp'],
        defaultLocale: 'sp'
    });
    return handleI18nRouting(modifiedRequest);
}

// export const config = {
//   matcher: ['/', '/(de|en)/:path*']
// };

// Export config for i18n middleware
export const config = {
    // Matcher entries are linked with a logical "or", therefore
    // if one of them matches, the middleware will be invoked.
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        '/((?!api|_next|_vercel|.*\\..*).*)',
        // However, match all pathnames within `/users`, optionally with a locale prefix
        '/([\\w-]+)?/users/(.+)',
    ]
};
