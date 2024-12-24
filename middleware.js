// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // List of public paths that are allowed without authentication
  const publicPaths = ['/login', '/public/images', '/public/css'];

  // Check if the user is authenticated (this example uses a cookie named "authToken")
  const authToken =  req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');

  // Allow access if the user is logged in or the path is public
  if (authToken || publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect unauthenticated requests to the login page
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|favicon.ico).*)', // Exclude Next.js assets and API routes from middleware
  ],
};
