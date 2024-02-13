import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const passwordTest = await bcrypt.hash('test123', 10)
    const domainFind = await prisma.domain.findFirst({
        where: { domain: 'test.com' }
    })
    if (!domainFind) {
        const domainTest = await prisma.domain.create({
            data: {
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
                companies: {
                    create: [
                        {
                            name: 'Company Test Ltda',
                            tradeName: 'Company Test',
                            document: '53.008.810/0001-50',
                            contact: 'Contact Test',
                            contactPhone: '(18) 98348-0158',
                            logo: 'https://fastly.picsum.photos/id/282/220/60.jpg?hmac=GWIxV3mvFU-mmUdEjzQPlWz5heg1tfod1cJH4qE3Yx0',
                            theme: 'default'
                        }
                    ]
                }
            },
            include: { users: true }
        })
        console.log({ domainTest })

        const professinalTest = await prisma.professional.create({
            data: {
                name: 'Professional Test',
                document: '18.169.216-8',
                document2: '800.414.990-18',
                email: 'professional.test@test.com',
                domainId: domainTest.id
            }
        })
        console.log({ professinalTest })

        const scheduleTest = await prisma.schedule.create({
            data: {
                name: 'Schedule Test',
                domainId: domainTest.id,
                professionalId: professinalTest.id
            }
        })
        console.log({ scheduleTest })

        const patientTest1 = await prisma.patient.create({
            data: {
                name: 'Patient Test 1',
                document: '23.906.918-3',
                document2: '596.842.530-01',
                email: 'patient1@test.com',
                domainId: domainTest.id
            }
        })
        const patientTest2 = await prisma.patient.create({
            data: {
                name: 'Patient Test 2',
                document: '42.808.228-2',
                document2: '528.671.220-74',
                email: 'patient2@test.com',
                domainId: domainTest.id
            }
        })
        console.log({ patientTest1, patientTest2 })

        const scheduleEvents = await prisma.scheduleEvent.createMany({
            data: [
                { 
                    title: 'Event 1', 
                    description: '', 
                    startDate: new Date(2024, 1, 20, 8, 30, 0),
                    endDate: new Date(2024, 1, 20, 9, 30, 0),
                    patientId: patientTest1.id, 
                    scheduleId: scheduleTest.id, 
                    domainId: domainTest.id 
                },
                { 
                    title: 'Event 2', 
                    description: '', 
                    startDate: new Date(2024, 1, 21, 8, 30, 0),
                    endDate: new Date(2024, 1, 21, 9, 30, 0),
                    patientId: patientTest2.id, 
                    scheduleId: scheduleTest.id, 
                    domainId: domainTest.id 
                }
            ]
        })

        console.log({ scheduleEvents })
    }
    else {
        console.log('Seed already created.')
    }
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