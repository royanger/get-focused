import {
  LoaderFunction,
  ActionFunction,
  useLoaderData,
  useActionData,
} from 'remix'
import { authenticator } from '~/services/auth.server'
import { findOrCreateDate } from '~/queries/findOrCreateDate'
import { findOrCreateWeek } from '~/queries/findOrCreateWeek'
import findWeeklyWin from '~/queries/findWeeklyWin'
import findWeeklyImprovements from '~/queries/findWeeklyImprovements'
import findWeeklyLearningPoints from '~/queries/findWeeklyLearningPoints'
import findWeeklyRefocus from '~/queries/findWeeklyRefocus'

// components
import Container from '~/components/container'
import { HeaderOne, HeaderTwo } from '~/components/headlines'
import ReviewElement from '~/components/weekly/reviewElement'
import ListSection from '~/components/weekly/ListSection'
import { validateWinsForm } from '~/libs/weekly/winsActions'
import { validateImprovementsForm } from '~/libs/weekly/improvementsActions'
import { validateLearningPointsForm } from '~/libs/weekly/learingPointsActions'
import { validateRefocusForm } from '~/libs/weekly/refocusActions'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  //   const dateResults = await findOrCreateDate()
  const weekResults = await findOrCreateWeek('today')
  const win = findWeeklyWin(weekResults.id, user.id)
  const improvements = findWeeklyImprovements(weekResults.id, user.id)
  const learningpoints = findWeeklyLearningPoints(weekResults.id, user.id)
  const refocus = findWeeklyRefocus(weekResults.id, user.id)

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
  let user = await authenticator.isAuthenticated(request)

  if (formData.get('formType') === 'win') {
    let results = validateWinsForm(formData, user)
    return results
  }
  if (formData.get('formType') === 'improvements') {
    let results = validateImprovementsForm(formData, user)
    return results
  }
  if (formData.get('formType') === 'learningpoints') {
    let results = validateLearningPointsForm(formData, user)
    return results
  }
  if (formData.get('formType') === 'refocus') {
    let results = validateRefocusForm(formData, user)
    return results
  }
  console.log('form data', formData)

  return null
}

export default function WeeklyReview() {
  const data = useLoaderData()
  const errors = useActionData()

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

          <ListSection
            items={data?.improvements}
            errors={errors}
            title="Tasks and Areas to Improve"
            info="What tasks were not completed? What areas can you improve next week?"
            formType="improvements"
          />

          <ListSection
            items={data?.learningpoints}
            errors={errors}
            title="Learning Points"
            info="List the things that you learned from or the ways you improved this week."
            formType="learningpoints"
          />

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
