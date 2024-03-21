import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {

  return NextResponse.next();

  /*
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (request.nextUrl.pathname.includes('/dashboard' || '/employee/dashboard')) {
    if (refreshToken) return NextResponse.next();
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname.includes('/login' || '/employee/login')){
    if (!refreshToken) return NextResponse.next();
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  */
}
