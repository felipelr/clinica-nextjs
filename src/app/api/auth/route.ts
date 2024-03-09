import { userService } from "@/prisma/factories/user-service-factory";

export async function GET(request: Request) {
    const users = await userService.getAll()

    return Response.json({ users: users || [] })
}