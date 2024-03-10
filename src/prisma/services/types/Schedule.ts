import { Prisma } from '@prisma/client'

const scheduleSelect = {
    id: true,
    name: true,
    professionalId: true,
    professional: true,
    domainId: true,
    domain: true,
    active: true,
    createdAt: true,
    modifiedAt: true
} satisfies Prisma.ScheduleSelect

const scheduleSelectWithEvents = {
    id: true,
    name: true,
    professionalId: true,
    professional: true,
    domainId: true,
    domain: true,
    active: true,
    createdAt: true,
    modifiedAt: true,
    scheduleEvents: true
} satisfies Prisma.ScheduleSelect

export type Schedule = Prisma.ScheduleGetPayload<{ select: typeof scheduleSelect }>
export type ScheduleWithEvents = Prisma.ScheduleGetPayload<{ select: typeof scheduleSelectWithEvents }>