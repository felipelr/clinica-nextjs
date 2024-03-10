import { Schedule, ScheduleWithEvents } from '@/prisma/services/types/Schedule'
import { ServiceInterface } from "@/prisma/services/interfaces/service-interface"

export interface ScheduleServiceInterface extends ServiceInterface<Schedule> {
    getByIdWithEvents(id: string): Promise<ScheduleWithEvents | null>
}