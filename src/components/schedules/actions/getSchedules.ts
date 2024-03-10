'use server'

import { MetaProps, ParamsProps } from "@/prisma/services/interfaces/service-interface"
import { Schedule } from '@/prisma/services/types/Schedule'
import { scheduleService } from "@/prisma/factories/schedule-service-factory"

export async function getSchedules(params?: ParamsProps): Promise<{ data: Schedule[], meta: MetaProps } | null> {
    try {
        return await scheduleService.getAll(params)
    }
    catch (err) {
        console.error(err)
        return null
    }
}