import Container from '~/components/container'
import Button from '~/components/button'
import { HeaderOne, HeaderTwo } from '~/components/headlines'

export default function WeeklyReview() {
  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Weekly Review</HeaderOne>

          <HeaderTwo>Primary Wins</HeaderTwo>

          <p>What was great about your week? What was a solid win for you?</p>

          <div className="flex flex-row items-center">
            <input
              className="border-2 border-purple p-2 text-black rounded flex-grow"
              type="text"
              placeholder="Enter a win from the week"
              aria-label="Win from the week"
            />
          </div>

          <Button type="submit" title="Save" />

          <Button type="submit" title="Cancel" variant="cancel" />

          <HeaderTwo>Tasks and Areas to Improve</HeaderTwo>
          <p>
            What tasks were not completed? What areas can you improve next week?
          </p>

          <HeaderTwo>Learning Points</HeaderTwo>
          <p>
            List the things that you learned from or the ways you improved this
            week.
          </p>

          <HeaderTwo>Refocus for Next Week</HeaderTwo>
          <p>What can you do to focus for next week?</p>
        </div>
      </Container>
    </>
  )
}
