import { Prisma } from '@prisma/client'

const domainSelect = {
    id: true,
    domain: true,
    active: true,
    createdAt: true,
    modifiedAt: true
} satisfies Prisma.DomainSelect

export type Domain = Prisma.DomainGetPayload<{ select: typeof domainSelect }>