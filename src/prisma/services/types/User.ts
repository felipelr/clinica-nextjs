import { Prisma } from '@prisma/client'

const userSelect = {
    id: true,
    name: true,
    email: true,
    domainId: true,
    domain: true,
    active: true,
    createdAt: true,
    modifiedAt: true,
} satisfies Prisma.UserSelect

const userWithPasswordSelect = {
    ...userSelect,
    password: true,
} satisfies Prisma.UserSelect

export type User = Prisma.UserGetPayload<{ select: typeof userSelect }>
export type UserWithPassword = Prisma.UserGetPayload<{ select: typeof userWithPasswordSelect }>