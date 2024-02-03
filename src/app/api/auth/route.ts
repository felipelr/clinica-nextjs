import { userService } from "@/prisma/services/user-service"

export async function GET(request: Request) {
    const users = await userService.getAll()

    return Response.json({ users: users || [] })
}