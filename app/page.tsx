'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) router.push('/dashboard');
  }, [router]);

  const handleGoogleLogin = () => {
    // Delay to ensure Google script has loaded
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-blue-600">MyDocs</h1>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login with Google
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Create and Access Documents Effortlessly</h2>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Organize, edit, and collaborate — all in one secure place. Sign in with your Google account to begin.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-700"
        >
          Get Started with Google
        </button>
      </main>

      <footer className="py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyDocs. All rights reserved.
      </footer>
    </div>
  );
}
