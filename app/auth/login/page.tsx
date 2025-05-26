'use client';
import { useEffect } from 'react';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

dotenv.config();

export default function HomePage() {
    useEffect(() => {

      

        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      
        if (!clientId || !window.google) {
          console.error("Google API not loaded or client ID missing", clientId);
          return;
        }
      
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (res) => {
            
            try {
              const headerResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential: res.credential }),
              });
          
              if (headerResponse.ok) {
                console.log("in ok")
                const { accessToken, user, redirectUrl } = await headerResponse.json();
          
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                console.log(redirectUrl )
                if (redirectUrl) {
                  window.location.href = redirectUrl;
                }
              } else {
                console.error('Login failed', await headerResponse.json());
              }
            } catch (err) {
              console.error('Something went wrong during login:', err);
            }
          }
        });
      
        window.google.accounts.id.renderButton(
          document.getElementById('googleBtn')!,
          { theme: 'outline', size: 'large' }
        );
      }, []);

  return <div id="googleBtn" className="mt-20 text-center"></div>;
}
