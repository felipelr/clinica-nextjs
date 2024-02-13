import { IService, ParamsProps } from './interfaces/IService'
import prisma from '@/prisma/index'
import { Schedule } from './types/Schedule'

class ScheduleService implements IService<Schedule> {

    constructor() {
    }

    async getById(id: string): Promise<Schedule | null> {
        try {
            return await prisma.schedule.findUniqueOrThrow({
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
            return await prisma.schedule.findMany({
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

export const scheduleService = new ScheduleService()