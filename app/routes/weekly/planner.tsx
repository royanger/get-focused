import Container from '~/components/container'
import Button from '~/components/button'
import { HeaderOne, HeaderTwo } from '~/components/headlines'

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
            <li className="p-4">
              <div className="flex flex-row items-center">
                <input
                  className="border-2 border-purple p-2 text-black rounded flex-grow"
                  type="text"
                  placeholder="Enter primary task..."
                  aria-label="Primary Task"
                />

                <input
                  className="mx-4 border-2 border-purple rounded text-xl w-6 h-6 "
                  type="checkbox"
                  aria-label="Completed"
                />
              </div>

              <Button title="Save" />

              <Button title="Cancel" variant="cancel" />
            </li>
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
