import { PrismaClient } from "@prisma/client"
export type { User as IUser } from "@prisma/client"

export const prisma = new PrismaClient()
