import { useLoaderData } from 'remix'
import Container from '~/components/container'
import { HeaderOne } from '~/components/headlines'
import Wellness from '~/components/daily/wellness'
import Exercise from '~/components/daily/exercise'
import Tasks from '~/components/daily/tasks'
import Notes from '~/components/daily/notes'
import Productivity from '~/components/daily/productivity'
import { returnUserId } from '~/libs/user'
import { findWellness } from '~/queries/findWellness'
import { findExercise } from '~/queries/findExercise'
import { findTasks } from '~/queries/findTasks'
import { findNotes } from '~/queries/findNotes'
import { findProductivity } from '~/queries/findProductivity'

export let loader = async () => {
  let wellness = await findWellness('today', returnUserId())
  let exercise = await findExercise('today', returnUserId())
  let dailyTasks = await findTasks('today', returnUserId())
  let notes = await findNotes('today', returnUserId())
  let productivity = await findProductivity('today', returnUserId())

  //   let tasks = await findTasks('0c0ece7f-4eb5-40d6-8400-c1bf6fb37937', user)
  //   console.log(tasks)

  return {
    tasks: dailyTasks,
    wellness: wellness,
    exercise: exercise,
    notes: notes,
    productivity: productivity,
  }
}

export default function DailyPlanner() {
  let data = useLoaderData()
  console.log(data)

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
