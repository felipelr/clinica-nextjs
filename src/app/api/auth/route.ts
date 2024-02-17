import { userService } from "@/prisma/services"

export async function GET(request: Request) {
    const users = await userService.getAll()

    return Response.json({ users: users || [] })
}