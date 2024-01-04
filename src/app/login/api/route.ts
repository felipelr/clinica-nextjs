import { UserService } from "@/prisma/services/user-service"

export async function GET(request: Request) {
    const userService = new UserService()
    const users = await userService.getAll()

    return Response.json({ users: users || [] })
}

export async function POST(request: Request) {
    const { email } = await request.json()
    const userService = new UserService()

    const data = await userService.login(email)

    return Response.json(data)
}