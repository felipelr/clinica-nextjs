import { Prisma } from '@prisma/client'

const userSelect = {
    id: true,
    name: true,
    email: true,
    password: true,
} satisfies Prisma.UserSelect

export type User = Prisma.UserGetPayload<{ select: typeof userSelect }>