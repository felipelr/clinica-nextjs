import { Prisma } from '@prisma/client'

const scheduleEventSelect = {
    id: true,
    title: true,
    description: true,
    startDate: true,
    endDate: true,
    eventStatus: true,
    patientId: true,
    patient: true,
    scheduleId: true,
    schedule: true,
    domainId: true,
    domain: true,
    createdAt: true,
    modifiedAt: true
} satisfies Prisma.ScheduleEventSelect

export type ScheduleEvent = Prisma.ScheduleEventGetPayload<{ select: typeof scheduleEventSelect }>