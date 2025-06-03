import DocumentRepository from "@/repositories/prisma/user/DocumentRepository";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string };
  }

var documentRepository = new DocumentRepository();

export async function GET(_: Request, { params }: Params) {
  const userId = params.id;
    try {
      const documents = await documentRepository.getAllByUserId(userId);
  
      return NextResponse.json(documents, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: 'Failed to fetch user', details: err }, { status: 500 });
    }
  }