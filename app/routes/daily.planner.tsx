import { useLoaderData } from 'remix'
import Container from '~/components/container'
import { HeaderOne } from '~/components/headlines'
import Wellness from '~/components/daily/wellness'
import Exercise from '~/components/daily/exercise'
import Tasks from '~/components/daily/tasks'
import Notes from '~/components/daily/notes'
import Productivity from '~/components/daily/productivity'
import { returnUserId } from '~/libs/user'
import { findWellnessEntries } from '~/queries/findWellness'
import { findExerciseEntries } from '~/queries/findExercise'
import { findTasksEntries } from '~/queries/findTasks'
import { findNotesEntries } from '~/queries/findNotes'
import { findProductivityEntries } from '~/queries/findProductivity'

export let loader = async () => {
  interface userId {
    userId: string
  }
  let userId = returnUserId()

  let wellness = await findWellnessEntries('today', userId)
  let exercise = await findExerciseEntries('today', userId)
  let dailyTasks = await findTasksEntries('today', userId)
  let notes = await findNotesEntries('today', userId)
  let productivity = await findProductivityEntries('today', userId)

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
  console.log('DATA', data)

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
