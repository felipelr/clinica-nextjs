import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const passwordTest = await bcrypt.hash('test123', 10)
    const domainTest = await prisma.domain.upsert({
        where: { id: '', OR: [{ domain: { equals: 'test.com' } }] },
        update: {},
        create: {
            domain: 'test.com',
            users: {
                create: [
                    {
                        name: 'Felipe Test',
                        email: 'felipe@test.com',
                        password: passwordTest
                    }
                ]
            },
        },
        include: { users: true }
    })
    console.log({ domainTest })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })