import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken') || null;
  const { pathname } = new URL(request.url);

  // Creating a response object
  let response = NextResponse.next();

  if (pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/cursos', request.url));
    }
    return response; // Continue to login if no token
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Handle course-specific redirection
  const match = pathname.match(/^\/cursos\/(\d+)\/?$/);
  if (match) {
    const id = match[1];
    return NextResponse.redirect(new URL(`/cursos/${id}/general`, request.url));
  }

  // Correctly set the Authorization header for downstream requests
  response.headers.set('Authorization', `Bearer ${token}`);
  response.headers.set('current-url', request.nextUrl.pathname);

  return response;
}

// Configuring paths for middleware application
export const config = {
  matcher: ['/cursos/:path*', '/login'],
};
