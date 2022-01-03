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

          <ReviewElement
            id={data?.win ? data.win.id : 'win-new'}
            item={data.win ? data?.win.item : 'Enter your win for the week...'}
            formType="win"
          />
          {errors && errors.id === data?.win?.id ? (
            <div className="text-sm text-error mb-6 h-5">
              {errors ? errors.msg : ''}
            </div>
          ) : null}

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

          <ReviewElement
            id={data?.refocus ? data.refocus.id : 'refocus-new'}
            item={
              data.refocus
                ? data?.refocus.item
                : 'What will you refocus on next week?'
            }
            formType="refocus"
          />
          {errors && errors.id === data?.refocus?.id ? (
            <div className="text-sm text-error mb-6 h-5">
              {errors ? errors.msg : ''}
            </div>
          ) : null}
        </div>
      </Container>
    </>
  )
}
