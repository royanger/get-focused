import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

export async function updateOrCreateWellness(
  id: string,
  rating: number,
  userId: string
) {
  console.log('id', id, 'rating', rating, 'userId', userId)
  let dateResults = await findOrCreateDate('today')

  await prisma.$connect()

  let user
  if (id === 'new') {
    console.log('create wellness entry')
    let user = await prisma.wellness.create({
      data: {
        rating: parseInt(rating),
        userId: userId,
        dateId: dateResults.id,
      },
    })
  } else {
    console.log('update wellness')
    user = await prisma.wellness.update({
      where: {
        id: id,
      },
      data: {
        rating: parseInt(rating),
      },
    })
  }

  //   let results = await prisma.user.findUnique({
  //     where: {
  //       googleId: googleId,
  //     },
  //   })

  //   if (!user) {
  //     throw new Error('failed to create or update user')
  //   }

  //   if (results) {
  //     return results
  //   } else {
  //     throw new Error('failed to query new/updated user successfully')
  //   }
}
