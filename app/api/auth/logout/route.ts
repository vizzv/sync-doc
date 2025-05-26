import { clearRefreshCookie } from '../../../lib/cookies';
import { NextResponse } from 'next/server';

export async function POST() {
  clearRefreshCookie();
  return NextResponse.json({ message: 'Logged out' });
}
