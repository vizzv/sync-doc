
import { prisma } from '@/lib/prisma';
import { User } from '@/lib/types/exports';
import __BaseRepository from '@/repositories/prisma/__baseRepository';
export default class UserRepository extends __BaseRepository<User> {

    constructor()
    {
        super(prisma.user);
    }

    getByEmail(email: string): Promise<User | null> {
        return this.modelClient.findUnique({
            where: { email },
        });
    }

    async createUser(userData:User): Promise<User> {

        var isUser = await this.modelClient.findUnique({
            where: { email: userData.email },
        })

        if(isUser){
            return isUser
        }
        const { name, email, avatar_url } = userData;
        return this.modelClient.create({
            data: {
                name,
                email,
                avatar_url: avatar_url || `https://www.gravatar.com/avatar/${name.split(' ')[0]}.png`,
            },
        });
    }

    updateUser(id: string, userData: Partial<User>): Promise<User> {
        return this.modelClient.update({
            where: { id },
            data: userData,
        });
    }

    deleteUser(id: string): Promise<User> {
        return this.modelClient.delete({
            where: { id },
        });
    }

}