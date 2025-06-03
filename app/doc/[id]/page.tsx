"use client"
import EditorClient from '@/app/components/EditorClient'
import Router from 'next/router';
  import React, { useEffect } from 'react'

 function page() {
  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const cookieMap: Record<string, string> = {};

    cookies.forEach(cookie => {
      const [key, value] = cookie.split('=');
      cookieMap[key] = value;
    });
    console.log('Cookies:', cookieMap);

    if (!cookieMap.user) {
      Router.push('/login');
    } else {
      const userFromCookie = JSON.parse(decodeURIComponent(cookieMap.user));
      console.log('User from cookie:', userFromCookie.user, typeof userFromCookie);
    }
    //TODO: validate user and document permission .
  }, []);


    return (
        <EditorClient/>
    )
  }

  export default page