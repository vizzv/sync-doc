
import DocumentRepository from '@/repositories/prisma/user/DocumentRepository';
import {Document} from '@/lib/types/exports';

const  documentRepository = new DocumentRepository();
export async function POST(req: Request) {


  try{
    const data = await req.json();
    console.log('Received data:', data);
    var createdDocument = await documentRepository.createDocument({owner_id:data.userId,title:data.title} as Document);
    return new Response(JSON.stringify(createdDocument), { status: 201 });
  }
  catch(err){
    console.error('Error connecting to database:', err);
    return new Response(JSON.stringify({ error: 'Database connection failed' }), { status: 500 });
  }
}
