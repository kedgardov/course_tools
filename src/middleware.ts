import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken') || null;
  const { pathname } = request.nextUrl;

  // If there's no token, redirect to login page regardless of the path
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is already logged in, redirect them away from the login page
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/herramientas', request.url));
  }

  // Course-specific redirection if the path matches /herramientas/cursos/:id
  const match = pathname.match(/^\/herramientas\/cursos\/(\d+)\/?$/);
  if (match) {
    const id = match[1];
    return NextResponse.redirect(new URL(`/herramientas/cursos/${id}/general`, request.url));
  }

  // Allow the request to pass through and add headers for authorization
  const response = NextResponse.next();
  response.headers.set('Authorization', `Bearer ${token}`);
  response.headers.set('current-url', pathname);

  return response;
}

// Apply middleware to the specified paths
export const config = {
  matcher: ['/herramientas/:path*', '/login'],
};
