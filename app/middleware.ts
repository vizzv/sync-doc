
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
//import { verifyAccessToken } from './lib/auth';

export function middleware(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.split(' ')[1];

  try {
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
