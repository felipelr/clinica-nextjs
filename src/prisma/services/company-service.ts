import { ServiceInterface, ParamsProps } from './interfaces/service-interface'
import { Company } from './types/Company'
import { PrismaClient } from '@prisma/client'

export class CompanyService implements ServiceInterface<Company> {

    constructor(private readonly prisma: PrismaClient) {
    }

    async getById(id: string): Promise<Company | null> {
        try {
            return await this.prisma.company.findUnique({
                where: { id },
                include: { domain: true }
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

    async getAll(params?: ParamsProps): Promise<Company[] | null> {
        try {
            const page = Number(params?.page || 1)
            const pageSize = Number(params?.pageSize || 10)
            return await this.prisma.company.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
                include: { domain: true }
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

    async getByDomain(domain: string, subdomain: string): Promise<Company | null> {
        try {
            return await this.prisma.company.findFirst({
                where: { domain: { domain, subdomain } },
                include: { domain: true }
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
}