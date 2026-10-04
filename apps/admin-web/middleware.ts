import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/verify-otp'];

/** Cheap edge guard. Real authorization (ADMIN role) is enforced by the API on every request. */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const hasSession =
    req.cookies.has('next-auth.session-token') || req.cookies.has('__Secure-next-auth.session-token');
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
