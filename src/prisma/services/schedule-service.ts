import { ServiceInterface, MetaProps, ParamsProps } from './interfaces/service-interface'
import { Schedule } from './types/Schedule'
import { PrismaClient } from '@prisma/client'
export class ScheduleService implements ServiceInterface<Schedule> {

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
            await this.prisma.$disconnect()
        }
    }

    async getAll(params?: ParamsProps): Promise<{ data: Schedule[], meta: MetaProps } | null> {
        try {
            const page = Number(params?.page || 1)
            const pageSize = Number(params?.pageSize || 10)
            const start = (page - 1) * pageSize
            const end = start + pageSize
            const schedules = await this.prisma.schedule.findMany({
                skip: start,
                take: pageSize,
                include: { domain: true, professional: true }
            })
            const totalRecords = await this.prisma.schedule.count()

            return {
                data: schedules,
                meta: {
                    currentPage: page,
                    pageSize,
                    totalRecords: totalRecords, 
                    from: totalRecords > 0 && start === 0 ? 1 : start, 
                    to: end > totalRecords ? totalRecords : end
                }
            }
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