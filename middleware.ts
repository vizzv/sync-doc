
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from './lib/auth';
import { jwtVerify } from 'jose';
import path from 'node:path/win32';
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const accessSecret = new TextEncoder().encode(JWT_SECRET);

const isApiRoute = (pathname: string) => {
  return pathname.startsWith('/api/');
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if(isApiRoute(pathname)) {
    return NextResponse.next();
  }
  const token = req.cookies.get('accessToken')?.value;
  if (!token) {
    console.log('No access token, redirecting to login');
    return NextResponse.redirect(new URL('/', req.url));
  }


  try {
    await jwtVerify(token, accessSecret);
    return NextResponse.next();
  } catch (err) {
    //console.log('Invalid token:', err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*','/doc/:path*','/api/:path*'],

};
