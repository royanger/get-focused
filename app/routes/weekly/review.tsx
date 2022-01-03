import {
  LoaderFunction,
  ActionFunction,
  useLoaderData,
  useActionData,
} from 'remix'
import { authenticator } from '~/services/auth.server'
import findWeeklyWin from '~/queries/findWeeklyWin'

// components
import Container from '~/components/container'
import { HeaderOne, HeaderTwo } from '~/components/headlines'
import ReviewElement from '~/components/weekly/reviewElement'
import ListSection from '~/components/weekly/ListSection'
import { findOrCreateDate } from '~/queries/findOrCreateDate'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  const dateResults = await findOrCreateDate('today')
  const win = findWeeklyWin(dateResults.id, user.id)

  const data = {}
  await Promise.all([win]).then(results => {
    data.win = results[0]
  })
  return data
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  if (formData.get('type') === 'wins') {
    console.log('FORMTYPE', 'wins')
  }
  if (formData.get('type') === 'improvement') {
    console.log('FORMTYPE', 'improvement')
  }
  if (formData.get('type') === 'learningpoints') {
    console.log('FORMTYPE', 'learningpoints')
  }
  if (formData.get('type') === 'refocus') {
    console.log('FORMTYPE', 'refocus')
  }
  console.log('form data', formData)

  return null
}

export default function WeeklyReview() {
  const data = useLoaderData()
  console.log('DATA IN COMPONENT', data.win.id)

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

          <ReviewElement
            id={data?.win?.id}
            win={data?.win?.item}
            formType="wins"
          />

          <ListSection
            items={data?.improvements}
            errors={null}
            title="Tasks and Areas to Improve"
            info="What tasks were not completed? What areas can you improve next week?"
            formType="improvements"
          />

          <ListSection
            items={items}
            errors={null}
            title="Learning Points"
            info="List the things that you learned from or the ways you improved this week."
            formType="learningpoints"
          />

          <HeaderTwo>Refocus for Next Week</HeaderTwo>
          <p>What can you do to focus for next week?</p>

          <ReviewElement
            id="asdfsdf"
            win="What is the most important thing to refocus on for next week?"
            formType="refocus"
          />
        </div>
      </Container>
    </>
  )
}
