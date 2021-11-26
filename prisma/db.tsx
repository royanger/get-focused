import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// declare global {
//   let prisma: PrismaClient | undefined
// }

// export const db =
//   global.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   })

export const db = {
  prisma: prisma,
}

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma
