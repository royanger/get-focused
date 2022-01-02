import {
  LoaderFunction,
  ActionFunction,
  useLoaderData,
  useActionData,
} from 'remix'
import { authenticator } from '~/services/auth.server'
import { findWeeklyReview } from '~/queries/findWeeklyReview'

// components
import Container from '~/components/container'
import { HeaderOne, HeaderTwo } from '~/components/headlines'
import ReviewElement from '~/components/weekly/reviewElement'
import Improvements from '~/components/weekly/improvements'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  console.log('working?')

  const results = await findWeeklyReview('today', user.id)

  console.log('results', results)

  return 'test'
}

export default function WeeklyReview() {
  const data = useLoaderData()

  const items = [
    {
      id: 'ididididididid',
      name: 'Something to improve',
      userId: 'useriduserid',
      dateId: 'dateidasdfadsf',
    },
  ]

  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Weekly Review</HeaderOne>

          <HeaderTwo>Primary Wins</HeaderTwo>

          <p>What was great about your week? What was a solid win for you?</p>

          <ReviewElement id="asdfsdf" win="Enter a win from the week" />

          <Improvements
            items={items}
            errors={null}
            title="Tasks and Areas to Improve"
            info="What tasks were not completed? What areas can you improve next week?"
          />

          <Improvements
            items={items}
            errors={null}
            title="Learning Points"
            info="List the things that you learned from or the ways you improved this week."
          />

          <HeaderTwo>Refocus for Next Week</HeaderTwo>
          <p>What can you do to focus for next week?</p>

          <ReviewElement
            id="asdfsdf"
            win="What is the most important thing to refocus on for next week?"
          />
        </div>
      </Container>
    </>
  )
}
