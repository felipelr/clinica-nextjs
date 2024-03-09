import { ScheduleService } from "@/prisma/services/schedule-service";
import { prisma } from "@/prisma/factories/prisma-factory";

export const scheduleService = new ScheduleService(prisma)