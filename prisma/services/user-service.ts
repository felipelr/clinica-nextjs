import { IService } from './interfaces/IService'
import { User } from './types/User'
import prisma from '@/prisma/index'

export class UserService implements IService<User> {

    constructor() {
    }

    async getAll (): Promise<User[] | null> {
        try {
            const allUsers = await prisma.user.findMany()
            return allUsers
        }
        catch(err)
        {   
            console.error(err)
            return null
        }
        finally {
            await prisma.$disconnect()
        }
    }

    async login (email: string): Promise<User | null> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: {
                        equals: email
                    }
                }
            })
            return user
        }
        catch(err)
        {   
            console.error(err)
            return null
        }
        finally {
            await prisma.$disconnect()
        }
    }
}