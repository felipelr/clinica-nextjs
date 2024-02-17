import prisma from '@/prisma/index'
import { ScheduleService } from "./schedule-service"
import { UserService } from './user-service'
import { CompanyService } from './company-service'

export const scheduleService = new ScheduleService(prisma)
export const userService = new UserService(prisma)
export const companyService = new CompanyService(prisma)