import { PrismaClient } from "@prisma/client/extension";

const MAX_RECORDS = 100;

export default abstract class __BaseRepository<A>
{
    constructor(protected modelClient:PrismaClient){
        if(!modelClient) {
            throw new Error("Prisma client is required");
        }
    }
    getAll(options:Record<string, any> = {}): Promise<A[]> {
        if(!options.take){
            options.take = MAX_RECORDS;
        }
        return this.modelClient.findMany({
            ...options,
            take: MAX_RECORDS,
        });
    }

    getById(id: string): Promise<A | null> {
        return this.modelClient.findUnique({
            where: { id },
        });
    }
}