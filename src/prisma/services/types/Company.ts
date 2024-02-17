import { Prisma } from '@prisma/client'

const companySelect = {
    id: true,
    name: true,
    tradeName: true,
    contact: true,
    contactPhone: true,
    document: true,
    logo: true,
    theme: true,
    domainId: true,
    domain: true,
    active: true,
    createdAt: true,
    modifiedAt: true
} satisfies Prisma.CompanySelect

export type Company = Prisma.CompanyGetPayload<{ select: typeof companySelect }>