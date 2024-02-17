import { IService, ParamsProps } from './interfaces/IService'
import { Schedule } from './types/Schedule'
import { PrismaClient } from '@prisma/client'
export class ScheduleService implements IService<Schedule> {

    constructor(private readonly prisma: PrismaClient) {
    }

    async getById(id: string): Promise<Schedule | null> {
        try {
            return await this.prisma.schedule.findUnique({
                where: { id },
                include: { domain: true, professional: true }
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

    async getAll(params?: ParamsProps): Promise<Schedule[] | null> {
        try {
            const page = Number(params?.page || 1)
            const pageSize = Number(params?.pageSize || 10)
            return await this.prisma.schedule.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
                include: { domain: true, professional: true }
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
}