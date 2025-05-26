import { cookies } from 'next/headers';

export async function setRefreshCookie(token: string) {
  (await cookies()).set('refreshToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearRefreshCookie() {
  (await cookies()).delete('refreshToken');
}

export async function getRefreshCookie() {
  return (await cookies()).get('refreshToken')?.value;
}
