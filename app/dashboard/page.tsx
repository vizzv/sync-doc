'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { get } from 'http';
import { User,Document } from '@/lib/types/exports';




export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState('');
  const [doc,setDoc] = useState<Document[] | null>(new Array<Document>());
  const router = useRouter();
  
  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const cookieMap: Record<string, string> = {};

    cookies.forEach(cookie => {
      const [key, value] = cookie.split('=');
      cookieMap[key] = value;
    });

    if (cookieMap.user ) {
      var userFromCookie = JSON.parse(decodeURIComponent(cookieMap.user));
      console.log('User from cookie:', userFromCookie.user,typeof userFromCookie);
      setUser({...userFromCookie.user});
      fetch(`api/document/user/${userFromCookie.user.id}`).then(res => res.json()).then((data) => {
        setDoc(data);
      });
    } else {
      
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    router.push('/');
  };

  const createNewDoc = async (userId:string) =>{
    try {
      const response = await fetch('/api/document', {body:JSON.stringify({title:"New Document",userId:userId??"temp"}),method:'POST',headers:{"Content-Type":"application/json"}});
      const newDoc: Document = await response.json();
      console.log('New document created:', newDoc);
      setDoc(prevDocs => prevDocs ? [...prevDocs, newDoc] : [newDoc]);

    }
    catch (err) {
      console.error('Error creating new document:', err);
    }
  }
  const getDocumentById = async (id:string) => {
    try{
      const response = await fetch(`/api/document/${id}`);
      const docContents = await response.json();
      if(docContents.redirect) {
        console.log("Redirecting to:", docContents.redirect);
        router.push(docContents.redirect);
        return;
      }
      console.log(await response.json())
    }
    catch (err) {
      console.error('Error fetching document:', err);
    }
  }

  if (!user) return <div>Loading user...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
        <h1 className="text-xl font-semibold text-gray-800">MyDocs</h1>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-gray-700">{user.name}</span>
              <img src={user.avatar_url??""} alt="User" className="w-10 h-10 rounded-full" />
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
          <div onClick={()=>{
            console.log("Creating new document for user:", user);
            createNewDoc(user?.id);
          }} className="aspect-[3/4] bg-white border border-gray-300 rounded shadow-sm hover:shadow-lg hover:border-blue-500 hover:bg-blue-50/50 flex flex-col items-center justify-center cursor-pointer">
            <span className="text-4xl text-blue-500 text-center">+</span>
            <p className="mt-2 text-sm text-blue-500 text-center"> Create Document</p>
          </div>
          {doc?.length === 0 && (
            <div className="col-span-5 text-center text-gray-500">
              No documents found. Start creating your first document!
              </div>)}
          {doc?.map((i:Document) => (
            <div
              key={i.id}
              onClick={() => {
                getDocumentById(i.id);
              }}
              className="aspect-[3/4] bg-white rounded hover:border-blue-400 border border-gray-200 shadow-sm p-3 flex flex-col justify-between hover:shadow-md cursor-pointer"
            >
              <div className="text-sm font-medium text-gray-800"> {i.title}</div>
              <div className="text-xs text-gray-500 mt-1">Last Updated at : {new Date(i.updated_at).toDateString()}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
