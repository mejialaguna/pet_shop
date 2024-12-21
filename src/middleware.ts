import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  // eslint-disable-next-line no-console
  console.log('middleware', request.url);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};