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
    const response = NextResponse.redirect(new URL('/herramientas/cursos', request.url));
    // Disable caching for the login page
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  }

  // Allow the request to pass through for other pages
  const response = NextResponse.next();
  response.headers.set('Authorization', `Bearer ${token}`);

  // Disable caching only for the login page
  if (pathname === '/login') {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  }

  return response;
}

// Apply middleware to the specified paths
export const config = {
  matcher: ['/herramientas/:path*', '/login'],
};
