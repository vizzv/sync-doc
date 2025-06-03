// app/api/document/route.ts (or wherever you're using MongoDB)
import dbConnect from '@/lib/mongodb';
import documentContentsModel from '@/models/documentContents.model';
import DocumentRepository from '@/repositories/prisma/user/DocumentRepository';
import {Document} from '@/lib/types/exports';

const  documentRepository = new DocumentRepository();
export async function POST(req: Request) {
  await dbConnect();

  try{
    const data = await req.json();
    console.log('Received data:', data);
    var createdDocument = await documentRepository.createDocument({owner_id:data.userId,title:data.title} as Document);
    console.log('Document created:', createdDocument);
    //const newDocument = await documentContentsModel.create(data);
    //console.log('New document created:', newDocument);
  }
  catch(err){
    console.error('Error connecting to database:', err);
    return new Response(JSON.stringify({ error: 'Database connection failed' }), { status: 500 });
  }
  return new Response(JSON.stringify("hii"), { status: 201 });
}
