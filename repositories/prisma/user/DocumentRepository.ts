import { Document, DocumentContent } from "@/lib/types/exports";
import __BaseRepository from "../__baseRepository";
import { prisma } from "@/lib/prisma";
import mongodbConnect from "@/lib/mongodb";
import documentContentsModel from "@/models/documentContents.model";

export default class DocumentRepository extends __BaseRepository<Document> {
    mongoClient: any;
    constructor() {
        super(prisma.document);
        this.mongoClient = mongodbConnect();
    }

    // You can add more specific methods for DocumentRepository here if needed

    async getAllByUserId(userId: string): Promise<Document[]> {
        return this.modelClient.findMany({
            where: { owner_id: userId },
        });
    }
    async createDocument(documentData: Document): Promise<Document> {
        const newDocument = await this.modelClient.create({
            data: documentData,
        });
        await documentContentsModel.create({
            document_id: newDocument.id,
            content_json: JSON.stringify({}),
            version_number: 1,
            created_by: documentData.owner_id,
            created_at: new Date(),
        })


        return newDocument;

    }
    async getContentById(documentId: string): Promise<DocumentContent|null> {
        try {
            const content = await documentContentsModel.findOne({
                document_id: documentId,
            });
            return content;
        } catch (error) {
            console.error("Error fetching document content:", error);
            throw error;
        }
    }

} 