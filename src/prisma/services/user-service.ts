import { IService } from './interfaces/IService'
import { User } from './types/User'
import prisma from '@/prisma/index'

class UserService implements IService<User> {

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
            throw err
        }
        finally {
            await prisma.$disconnect()
        }
    }

    async login (email: string, password: string): Promise<User | null> {
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
            throw err
        }
        finally {
            await prisma.$disconnect()
        }
    }
}

export const userService = new UserService()