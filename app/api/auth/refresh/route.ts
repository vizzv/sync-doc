import { signAccessToken, verifyRefreshToken } from '../../../lib/auth';
import { getRefreshCookie } from '../../../lib/cookies';
import { NextResponse } from 'next/server';

export async function POST() {
  const token:string = await getRefreshCookie()??'';
  if (!token) return NextResponse.json({ error: 'No refresh token' }, { status: 401 });

  try {
    const user = verifyRefreshToken(token) as any;
    const accessToken = signAccessToken({ email: user.email, name: user.name });

    return NextResponse.json({ accessToken });
  } catch {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
  }
}
