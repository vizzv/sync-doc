import DocumentRepository from "@/repositories/prisma/user/DocumentRepository";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string };
  }

var documentRepository = new DocumentRepository();

export async function GET(_: Request, context: Params) {
  const documentId = context.params.id;
    try {
      const document = await documentRepository.getById(documentId);
     const documentContent = await documentRepository.getContentById(documentId);
      return NextResponse.json({ document:document,documentContent:documentContent, status: 200,redirect:`/doc/${documentId}` });
    } catch (err) {
      return NextResponse.json({ error: 'Failed to fetch user', details: err }, { status: 500 });
    }
  }