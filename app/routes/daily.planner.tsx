import { useLoaderData } from 'remix'
import Container from '~/components/container'
import { HeaderOne } from '~/components/headlines'
import { getDate } from '~/libs/getDate'
import Wellness from '~/components/daily/wellness'
import Exercise from '~/components/daily/exercise'
import Tasks from '~/components/daily/tasks'
import Notes from '~/components/daily/notes'
import Productivity from '~/components/daily/productivity'
import { findTasks } from '~/queries/findTasks'

export let loader = async () => {
  let date = getDate()

  // TODO This needs to be replaced -- hardcoded userId
  // userId for my user for testing
  let user = '267744ec-215f-4012-812b-ddfba3704257'

  //   let tasks = await findTasks('0c0ece7f-4eb5-40d6-8400-c1bf6fb37937', user)
  //   console.log(tasks)

  //   return {
  //     tasks: dailyTasks,
  //     wellness: wellness,
  //     exercise: exercise,
  //     notes: notes,
  //     productivity: productivity,
  //   }
  return 'test'
}

export default function DailyPlanner() {
  let data = useLoaderData()
  //   console.log(data)

  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Daily Planner</HeaderOne>

          <Wellness />

          <Exercise />

          <Tasks />

          <Notes />

          <Productivity />
        </div>
      </Container>
    </>
  )
}
