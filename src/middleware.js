// src/middleware.js
import { NextResponse } from 'next/server';
import { decodeMockToken } from './utils/auth';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  if (!token) {
    if (pathname.startsWith('/general') || pathname.startsWith('/superAdmin') || pathname.startsWith('/orgAdmin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded = decodeMockToken(token);
    const role = decoded.role;

    if (pathname.startsWith('/general') && role !== 'general') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (pathname.startsWith('/superAdmin') && role !== 'superadmin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (pathname.startsWith('/orgAdmin') && role !== 'orgadmin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // For orgadmin, check orgId if accessing organization-specific routes
    if (role === 'orgadmin' && decoded.orgId) {
      const orgIdFromPath = pathname.match(/\/orgAdmin\/class\/([^/]+)/)?.[1];
      if (orgIdFromPath && orgIdFromPath !== decoded.orgId) {
        return NextResponse.redirect(new URL('/orgAdmin/dashboard', request.url));
      }
    }
  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/general/:path*', '/superAdmin/:path*', '/orgAdmin/:path*'],
};