import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

// Second try for Postgress errors
// declare global {
//   let prisma: PrismaClient | undefined
// }

// const prismaClientPropertyName = `__prevent-name-collision__prisma`
// type GlobalThisWithPrismaClient = typeof globalThis & {
//   [prismaClientPropertyName]: PrismaClient
// }

// const getPrismaClient = () => {
//   if (process.env.NODE_ENV === `production`) {
//     return new PrismaClient()
//   } else {
//     const newGlobalThis = globalThis as GlobalThisWithPrismaClient
//     if (!newGlobalThis[prismaClientPropertyName]) {
//       newGlobalThis[prismaClientPropertyName] = new PrismaClient()
//     }
//     return newGlobalThis[prismaClientPropertyName]
//   }
// }
// export const db = getPrismaClient()

// First try for errors

// export const db =
//   global.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   })

// export const prisma = {  prisma: prisma, }

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma
