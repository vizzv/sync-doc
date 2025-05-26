import { NextResponse } from 'next/server';
import { verifyGoogleToken } from '../../../lib/google';
import { signAccessToken, signRefreshToken } from '../../../lib/auth';
import { setRefreshCookie } from '../../../lib/cookies';

export async function POST(req: Request) {
  const { credential } = await req.json();
  const payload = await verifyGoogleToken(credential);
  if (!payload?.email) return NextResponse.json({ error: 'Invalid Google token' }, { status: 401 });

  const user = { email: payload.email, name: payload.name, picture: payload.picture };
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  setRefreshCookie(refreshToken);

  return NextResponse.json({ accessToken, user , redirectUrl :"/dashboard" });
}
