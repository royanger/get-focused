import Container from '~/components/container'

import { HeaderOne, HeaderTwo } from '~/components/headlines'
import Task from '~/components/weekly/taskElement'

export default function WeeklyPlanner() {
  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Weekly Planner</HeaderOne>

          <HeaderTwo>Primary Tasks</HeaderTwo>

          <p>
            These are the most important tasks for your week, the tasks that
            need to be completed
          </p>

          <ol className="list-decimal">
            <Task />
          </ol>
          <HeaderTwo>Secondary Tasks</HeaderTwo>
          <p>
            The tasks here should be completed, but only after you complete the
            primary tasks.
          </p>

          <HeaderTwo>Non-Essential Tasks</HeaderTwo>
          <p>
            Extra tasks that would be a pure bonus if you could complete them.
          </p>
        </div>
      </Container>
    </>
  )
}
