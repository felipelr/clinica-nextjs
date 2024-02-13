import { IService } from './interfaces/IService'
import { User } from './types/User'
import prisma from '@/prisma/index'
import bcrypt from 'bcrypt'

class UserService implements IService<User> {

    constructor() {
    }

    async getById(id: string): Promise<User | null> {
        try {
            return await prisma.user.findUniqueOrThrow({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    domainId: true,
                    active: true,
                    createdAt: true,
                    modifiedAt: true,
                    domain: true
                },
                where: { id },                
            })
        }
        catch (err) {
            console.error(err)
            throw err
        }
        finally {
            await prisma.$disconnect()
        }
    }

    async getAll(): Promise<User[] | null> {
        try {
            return await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    domainId: true,
                    active: true,
                    createdAt: true,
                    modifiedAt: true,
                    domain: true
                }
            })
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
                },
                include: { domain: true }
            })
            if (user) {
                const verified = await bcrypt.compare(password, user.password)
                const { password: userpass, ...userWithoutPassword } = user
                if (verified) return userWithoutPassword
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