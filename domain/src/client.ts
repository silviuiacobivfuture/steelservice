import { PrismaClient } from '../generated/prisma-client'

declare global {
  var __db: PrismaClient | undefined
}

export const InstantiatePrismaClient = () => {
    let prisma: PrismaClient

    if (process.env.NODE_ENV === 'production') {
        prisma = new PrismaClient()
        prisma.$connect()
      } else {
        if (!global.__db) {
          global.__db = new PrismaClient()
          global.__db.$connect()
        }
        prisma = global.__db
      }
      return prisma
}