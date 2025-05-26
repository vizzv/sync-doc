'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  picture: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    fetch('/api/protected', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setData);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
        <h1 className="text-xl font-semibold text-gray-800">MyDocs</h1>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-gray-700">{user.name}</span>
              <img src={user.picture} alt="User" className="w-10 h-10 rounded-full" />
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Start a new document</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div className="aspect-[3/4] bg-white border border-gray-300 rounded shadow-sm hover:shadow-lg flex flex-col items-center justify-center cursor-pointer">
            <span className="text-4xl text-blue-500">+</span>
            <p className="mt-2 text-sm text-gray-600">Blank</p>
          </div>

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-white rounded border border-gray-200 shadow-sm p-3 flex flex-col justify-between hover:shadow-md cursor-pointer"
            >
              <div className="text-sm font-medium text-gray-800">Document {i}</div>
              <div className="text-xs text-gray-500 mt-1">Opened recently</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Protected API Response: {JSON.stringify(data)}
        </div>
      </main>
    </div>
  );
}
