'use client';

import { Document, DocumentContent } from '@/lib/types/exports';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const EditorClient = ({documentId}:{documentId:string}) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(`/api/document/${documentId}`).then(res => res.json()).then((dt:{document:Document,documentContent:DocumentContent}) => {
      setData(dt.documentContent.content_json);
    })
  }, []);

  return (
    <>
    <div> Navigation bar</div>
      <Editor data={data} documentId={documentId}/>
    </>
  );
}



export default EditorClient;
