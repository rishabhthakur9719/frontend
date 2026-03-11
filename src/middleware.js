import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/teacher', '/student'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Access the token set by js-cookie inside AuthContext
  const token = request.cookies.get('token')?.value;

  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Token exists - Role-based client protection is handled by context & layouts
  return NextResponse.next();
}

export const config = {
  matcher: ['/teacher/:path*', '/student/:path*'],
};
