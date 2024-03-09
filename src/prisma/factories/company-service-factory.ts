import { CompanyService } from "@/prisma/services/company-service";
import { prisma } from "@/prisma/factories/prisma-factory";

export const companyService = new CompanyService(prisma)