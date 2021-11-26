import { db } from '../../prisma/db'

export let findTasks = async (targetDateId, userId) => {
  //let date = new Date(targetDate)
  console.log(targetDateId)
  console.log(userId)

  let dailyTasks = await db.task.findMany({
    where: {
      AND: [
        { dateId: '0c0ece7f-4eb5-40d6-8400-c1bf6fb37937' },
        { userId: '267744ec-215f-4012-812b-ddfba3704257' },
      ],
    },
  })
  return dailyTasks
}
