import { PrismaClient } from '@prisma/client'
import { ServiceInterface } from './interfaces/service-interface'
import { User } from './types/User'
import bcrypt from 'bcrypt'
export class UserService implements ServiceInterface<User> {

    constructor(private readonly prisma: PrismaClient) {
    }

    async getById(id: string): Promise<User | null> {
        try {
            return await this.prisma.user.findUnique({
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
            await this.prisma.$disconnect()
        }
    }

    async getAll(): Promise<User[] | null> {
        try {
            return await this.prisma.user.findMany({
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
            await this.prisma.$disconnect()
        }
    }

    async login(email: string, password: string): Promise<User | null> {
        try {
            const user = await this.prisma.user.findFirst({
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
            await this.prisma.$disconnect()
        }
    }
}