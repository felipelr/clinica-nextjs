import { IService } from './interfaces/IService'
import { User } from './types/User'
import prisma from '@/prisma/index'
import bcrypt from 'bcrypt'

class UserService implements IService<User> {

    constructor() {
    }

    async getAll(): Promise<User[] | null> {
        try {
            const allUsers = await prisma.user.findMany()
            return allUsers
        }
        catch (err) {
            console.error(err)
            throw err
        }
        finally {
            await prisma.$disconnect()
        }
    }

    async login(email: string, password: string): Promise<User | null> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: {
                        equals: email
                    }
                }
            })
            if (user) {
                //await bcrypt.hash(myPlaintextPassword, saltRounds)
                const verified = await bcrypt.compare(password, user.password)
                if (verified) return user
            }
            return null
        }
        catch (err) {
            console.error(err)
            throw err
        }
        finally {
            await prisma.$disconnect()
        }
    }
}

export const userService = new UserService()