import { prisma } from '../../prisma/db'

export async function findOrCreateGoogleUser(
  googleId: string,
  email: string,
  displayName: string
) {
  await prisma.$connect()
  let user = await prisma.user.upsert({
    where: {
      googleId: googleId,
    },
    update: {
      email: email,
      displayName: displayName,
    },
    create: {
      googleId: googleId,
      email: email,
      displayName: displayName,
    },
  })

  let results = await prisma.user
    .findUnique({
      where: {
        googleId: googleId,
      },
    })
    .catch(e => {
      throw new Error(e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  if (!user) {
    throw new Error('failed to create or update user')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated user successfully')
  }
}
