import { UserService } from "@/prisma/services/user-service";
import { prisma } from "@/prisma/factories/prisma-factory";

export const userService = new UserService(prisma)