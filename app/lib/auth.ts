import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const REFRESH_SECRET = process.env.NEXT_PUBLIC_REFRESH_SECRET!;

export function signAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}
