import { prisma } from '../../prisma/db'

export async function findOrCreateUser(
  googleId: string,
  email: string,
  givenName: string,
  familyName: string
) {
  await prisma.$connect()
  let user = await prisma.user.upsert({
    where: {
      googleId: googleId,
    },
    update: {
      email: email,
      givenName: givenName,
      familyName: familyName,
    },
    create: {
      googleId: googleId,
      email: email,
      givenName: givenName,
      familyName: familyName,
    },
  })

  if (user) {
    return user
  } else {
    throw new Error('failed to create or update user')
  }
}
