import { prisma } from '../../prisma/db'

export async function findOrCreateTwitterUser(
  twitterId: number,
  email: string | undefined,
  displayName: string
) {
  await prisma.$connect()
  const user = await prisma.user.upsert({
    where: {
      twitterId: twitterId,
    },
    update: {
      email: email,
      displayName: displayName,
    },
    create: {
      twitterId: twitterId,
      email: email,
      displayName: displayName,
    },
  })

  const results = await prisma.user
    .findUnique({
      where: {
        twitterId: twitterId,
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
