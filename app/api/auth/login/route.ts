import { NextResponse } from 'next/server';
import { verifyGoogleToken } from '../../../../lib/google';
import { signAccessToken, signRefreshToken } from '../../../../lib/auth';
import { setAccessCookie, setRefreshCookie } from '../../../../lib/cookies';
import dotenv from 'dotenv';
import { cookies } from 'next/headers';
dotenv.config();

export async function POST(req: Request) {
  const { credential } = await req.json();
  const payload = await verifyGoogleToken(credential);
  if (!payload?.email) return NextResponse.json({ error: 'Invalid Google token' }, { status: 401 });

  const user = { email: payload.email, name: payload.name, picture: payload.picture };
  const accessToken = await signAccessToken(user);
  const refreshToken = await signRefreshToken(user);
  await setRefreshCookie(refreshToken);
  await setAccessCookie(accessToken);

   const loginUser = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/user`,{body:JSON.stringify(user),method:"POST",headers:{"Content-Type":"application/json"}}).then(res => res.json()).catch(err => { console.log(err); }) ;
   (await (cookies())).set('user', JSON.stringify({user:loginUser}), {path:'/'}); 
   return NextResponse.json(
    { accessToken, user , redirectUrl :"/dashboard",userId: loginUser.id,userEmail: loginUser.email },
    {
    status: 200,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-User-Email': loginUser.email,
      'Content-Type': 'application/json',
    },

  });
}
