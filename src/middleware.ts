import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { generateAccessToken } from './app/services/operations/auth/customerAuth';

export const config = {
  matcher: ['/dashboard/:path*', '/employee/dashboard/:path*'],
}

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const isAccessAuthenticated = accessToken?.value;
  const isRefreshAuthenticated = refreshToken?.value;

  if (isAccessAuthenticated) {
    return NextResponse.next();
  }

  if (isRefreshAuthenticated) {
    await generateAccessToken(refreshToken?.value);
    const newAccessToken = cookieStore.get('accessToken')?.value;
    if (newAccessToken) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/login', request.url));
}
