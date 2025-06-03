import { clearAccessCookie, clearRefreshCookie } from '../../../../lib/cookies';
import { NextResponse } from 'next/server';

export async function POST() {
  console.log('Logout request received');
  await clearAccessCookie();
  await clearRefreshCookie();
  console.log('Cookies cleared, user logged out');
  return NextResponse.json({ message: 'Logged out' });
}
