import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const REFRESH_SECRET = process.env.NEXT_PUBLIC_REFRESH_SECRET!;

const accessSecret = new TextEncoder().encode(JWT_SECRET);
const refreshSecret = new TextEncoder().encode(REFRESH_SECRET);

// Sign Access Token
export async function signAccessToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime('15m')
    .sign(accessSecret);
}

// Sign Refresh Token
export async function signRefreshToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader( { alg: 'HS256', typ: 'JWT' })
    .setExpirationTime('7d')
    .sign(refreshSecret);
}

// Verify Access Token
export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, accessSecret);
  return payload;
}

// Verify Refresh Token
export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, refreshSecret);
  return payload;
}
