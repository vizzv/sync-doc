import { Document, DocumentContent } from "@/lib/types/exports";
import __BaseRepository from "../__baseRepository";
import { prisma } from "@/lib/prisma";
import mongodbConnect from "@/lib/mongodb";
import documentContentsModel from "@/models/documentContents.model";
import {PrismaClient } from "@prisma/client/extension";
import { create } from "domain";

export default class DocumentRepository extends __BaseRepository<Document> {
    mongoClient: any;
    documentPersmissionClient: PrismaClient;
    permissionClient: PrismaClient;
    constructor() {
        super(prisma.document);
        this.mongoClient = mongodbConnect();
        this.documentPersmissionClient = prisma.documentPermission;
        this.permissionClient = prisma.permission;
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
        const ownerPersmission = await this.permissionClient.findFirst({
            where: {
                name: "owner",
            },
        });

        //TODO: import permissions and use admin for owner id in document permission
        const documentPermission = await this.documentPersmissionClient.create({
            data: {
                document_id: newDocument.id,
                permission_id: ownerPersmission?.id,
                user_id: documentData.owner_id,
                granted_by : documentData.owner_id,
            },
        });


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

    async editDocumentById(documentId:string,content_json:any)
    {
        try {
            const existingContent = await documentContentsModel.findOne({
                document_id: documentId,
            });

            if (!existingContent) {
                throw new Error("Document content not found");
            }

            const updatedContent = await documentContentsModel.updateOne(
                { document_id: documentId },
                {
                    content_json: JSON.stringify(content_json),
                    version_number: existingContent.version_number + 1,
                    updated_at: new Date(),
                }
            );

            return updatedContent;
        } catch (error) {
            console.error("Error updating document content:", error);
            throw error;
        }
    }

} 