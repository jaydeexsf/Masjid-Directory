import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromRequest } from './lib/jwt';

export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Prefer cookie for server-protected routes; fallback to Authorization header
    const cookieToken = request.cookies.get('authToken')?.value;
    const headerToken = extractTokenFromRequest(request);
    const token = cookieToken || headerToken;
    
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = verifyToken(token);
    if (!payload) {
      // Redirect to login if token is invalid
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Add user info to headers for use in API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email);
    requestHeaders.set('x-user-role', payload.role);
    if (payload.masjidId) {
      requestHeaders.set('x-masjid-id', payload.masjidId);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
