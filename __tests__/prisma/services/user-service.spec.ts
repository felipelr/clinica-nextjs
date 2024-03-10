import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import { UserService } from '@/prisma/services/user-service'
import { prismaMock } from '../../mocks/prisma/prisma-client-mock'
import bcrypt from 'bcrypt'

test('should Login return user when credencials are correct', async () => {
    const email = 'felipe@test.com'
    const password = 'test123'
    const passwordTest = await bcrypt.hash(password, 10)
    const userResponse = {
        id: 'test1',
        active: true,
        domainId: 'domain1',
        createdAt: new Date(),
        modifiedAt: new Date(),
        name: 'User Test',
        email,
        password: passwordTest
    }
    prismaMock.user.findFirst.mockResolvedValue(userResponse)
    const userService = new UserService(prismaMock)
    const result = await userService.login(email, password)
    expect(result?.email).toBe(email)
})

test('should Login return null when credencials are incorrect', async () => {
    const email = 'felipe@test.com'
    const password = 'test123'
    const passwordTest = await bcrypt.hash(password, 10)
    const userResponse = {
        id: 'test1',
        active: true,
        domainId: 'domain1',
        createdAt: new Date(),
        modifiedAt: new Date(),
        name: 'User Test',
        email,
        password: passwordTest
    }
    prismaMock.user.findFirst.mockResolvedValue(userResponse)
    const userService = new UserService(prismaMock)
    const result = await userService.login(email, '123')
    expect(result).toBe(null)
})