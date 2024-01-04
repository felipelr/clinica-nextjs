import { UserService } from "@/prisma/services/user-service"

export async function GET(request: Request) {
    const userService = new UserService()
    const users = await userService.getAll()
 
    return Response.json({ users: users || [] })
}