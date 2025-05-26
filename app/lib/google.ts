import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv'
dotenv.config();

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(idToken: string) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

  });

  return ticket.getPayload();
}
