import {
  LoaderFunction,
  ActionFunction,
  useLoaderData,
  useActionData,
} from 'remix'
import { authenticator } from '~/services/auth.server'
import { findOrCreateDate } from '~/queries/findOrCreateDate'
import findWeeklyWin from '~/queries/findWeeklyWin'
import findWeeklyImprovements from '~/queries/findWeeklyImprovements'
import findWeeklyLearningPoints from '~/queries/findWeeklyLearningPoints'
import findWeeklyRefocus from '~/queries/findWeeklyRefocus'

// components
import Container from '~/components/container'
import { HeaderOne, HeaderTwo } from '~/components/headlines'
import ReviewElement from '~/components/weekly/reviewElement'
import ListSection from '~/components/weekly/ListSection'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  const dateResults = await findOrCreateDate('today')
  const win = findWeeklyWin(dateResults.id, user.id)
  const improvements = findWeeklyImprovements(dateResults.id, user.id)
  const learningpoints = findWeeklyLearningPoints(dateResults.id, user.id)
  const refocus = findWeeklyRefocus(dateResults.id, user.id)

  const data = {}
  await Promise.all([win, improvements, learningpoints, refocus]).then(
    results => {
      data.win = results[0]
      data.improvements = results[1]
      data.learningpoints = results[2]
      data.refocus = results[3]
    }
  )
  return data
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  if (formData.get('formType') === 'wins') {
    console.log('FORMTYPE', 'wins')
  }
  if (formData.get('formType') === 'improvement') {
    console.log('FORMTYPE', 'improvement')
  }
  if (formData.get('formType') === 'learningpoints') {
    console.log('FORMTYPE', 'learningpoints')
  }
  if (formData.get('formType') === 'refocus') {
    console.log('FORMTYPE', 'refocus')
  }
  console.log('form data', formData)

  return null
}

export default function WeeklyReview() {
  const data = useLoaderData()
  console.log('DATA IN COMPONENT', data)

  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Weekly Review</HeaderOne>

          <HeaderTwo>Primary Wins</HeaderTwo>

          <p>What was great about your week? What was a solid win for you?</p>

          <ReviewElement
            id={data?.win?.id}
            item={data?.win?.item}
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
            items={data?.learningpoints}
            errors={null}
            title="Learning Points"
            info="List the things that you learned from or the ways you improved this week."
            formType="learningpoints"
          />

          <HeaderTwo>Refocus for Next Week</HeaderTwo>
          <p>What can you do to focus for next week?</p>

          <ReviewElement
            id={data?.refocus?.id}
            item={data?.refocus?.item}
            formType="refocus"
          />
        </div>
      </Container>
    </>
  )
}
