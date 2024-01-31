import { Prisma } from '@prisma/client'

const userSelect = {
    idusuario: true,
    nome: true,
    sobrenome: true,
    email: true
} satisfies Prisma.UserSelect

export type User = Prisma.UserGetPayload<{ select: typeof userSelect }>