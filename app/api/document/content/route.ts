import DocumentRepository from "@/repositories/prisma/user/DocumentRepository";
import { NextResponse } from "next/server";

const documentRepository = new DocumentRepository();

export async function POST(req: Request) {
    const body = await req.json();
    const documentId = body.documentId;
    const updatedContent = body.content_json;
      try {
        const updatedDocument = await documentRepository.editDocumentById(documentId, updatedContent);
    
        return NextResponse.json(updatedDocument, { status: 200 });
      } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch user', details: err }, { status: 500 });
      }
    }