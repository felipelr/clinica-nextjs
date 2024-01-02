import { IService } from './interfaces/IService'
import { User } from './types/User'
import prisma from '@/prisma/index'

export class UserService implements IService<User> {

    constructor() {
    }

    async getAll (): Promise<User[] | null> {
        try {
            const allUsers = await prisma.user.findMany()
            return allUsers as User[]
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