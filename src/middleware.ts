import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/' || path.startsWith('/verifypassword');

  const token = request.cookies.get('token')?.value || "";

  if (isPublicPath && token && path !== '/') {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (path === '/' && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup', '/profile/:path*', '/verifyemail', '/verifypassword/:path*'],
};
