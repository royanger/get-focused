import {
  createDateInstance,
  formatDateRange,
  startDateAndEndDateFromWeek,
  createDateFromWeekAndYear,
  returnNextAndPreviousWeeks,
} from '~/libs/dateFunctions'

import {
  LoaderFunction,
  ActionFunction,
  useLoaderData,
  useActionData,
  useSearchParams,
  redirect,
} from 'remix'
import { authenticator } from '~/services/auth.server'
import { findOrCreateWeek } from '~/queries/findOrCreateWeek'

// loaders
import findWin from '~/queries/weekly/findWin'
import findImprovements from '~/queries/weekly/findImprovements'
import findLearningPoints from '~/queries/weekly/findLearningPoints'
import findRefocus from '~/queries/weekly/findRefocus'
import WeeklyNav from '~/components/weekly/WeeklyNav'

// actions
import { validateWinsForm } from '~/libs/weekly/winsActions'
import {
  deleteImprovementsForm,
  validateImprovementsForm,
} from '~/libs/weekly/improvementsActions'
import { validateLearningPointsForm } from '~/libs/weekly/learningPointsActions'
import { validateRefocusForm } from '~/libs/weekly/refocusActions'

// components
import Container from '~/components/Container'
import { HeaderOne, HeaderTwo } from '~/components/Headlines'
import ReviewElement from '~/components/weekly/ReviewElement'
import ListSection from '~/components/weekly/ListSection'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect('/')
  }

  const url = new URL(request.url)

  let year
  let week

  if (
    url.searchParams.get('week') === null ||
    url.searchParams.get('year') === null
  ) {
    year = createDateInstance('today').year
    week = createDateInstance('today').weekNumber
  } else {
    week = parseInt(url.searchParams.get('week')!)
    year = parseInt(url.searchParams.get('year')!)
  }

  const weekResults = await findOrCreateWeek(year, week)

  const [win, improvements, learningpoints, refocus] = await Promise.all([
    findWin(weekResults.id, user.id),
    findImprovements(weekResults.id, user.id),
    findLearningPoints(weekResults.id, user.id),
    findRefocus(weekResults.id, user.id),
  ])

  return { win, improvements, learningpoints, refocus }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  let user = await authenticator.isAuthenticated(request)

  let results
  switch (formData.get('formType')) {
    case 'win':
      results = await validateWinsForm(formData, user)
      break
    case 'improvements':
      results = await validateImprovementsForm(formData, user)
      break
    case 'learningpoints':
      results = await validateLearningPointsForm(formData, user)
      break
    case 'refocus':
      results = await validateRefocusForm(formData, user)
      break
    case 'deleteimprovements':
      results = await deleteImprovementsForm(formData.get('id'), user)
      break
    default:
      results = 'Type does not meet valid action'
  }
  return results

  //   if (formData.get('formType') === 'win') {
  //     let results = validateWinsForm(formData, user)
  //     return results
  //   }
  //   if (formData.get('formType') === 'improvements') {
  //     let results = validateImprovementsForm(formData, user)
  //     return results
  //   }
  //   if (formData.get('formType') === 'learningpoints') {
  //     let results = validateLearningPointsForm(formData, user)
  //     return results
  //   }
  //   if (formData.get('formType') === 'refocus') {
  //     let results = validateRefocusForm(formData, user)
  //     return results
  //   }

  //   return null
}

export default function WeeklyReview() {
  const { win, improvements, learningpoints, refocus } = useLoaderData()
  const errors = useActionData()

  const [searchParams] = useSearchParams()
  const paramYear = searchParams.get('year')
  const paramWeek = searchParams.get('week')

  // if the year and week are undefined, then determine for current date
  const year = paramYear
    ? parseInt(paramYear)
    : createDateInstance('today').year
  const week = paramWeek
    ? parseInt(paramWeek)
    : createDateInstance('today').weekNumber

  // get previous week and year, and next week and year
  const nextAndPrev = returnNextAndPreviousWeeks(
    createDateFromWeekAndYear(week, year)
  )
  const startAndEndDates = startDateAndEndDateFromWeek(week, year)

  // format the dates for UI
  const dates = formatDateRange(startAndEndDates.start, startAndEndDates.end)

  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Weekly Review</HeaderOne>
          <WeeklyNav
            navigation={{
              back: {
                year: nextAndPrev.prev.year,
                week: nextAndPrev.prev.week,
              },
              forward: {
                year: nextAndPrev.next.year,
                week: nextAndPrev.next.week,
              },
            }}
            dates={dates}
          />
          <HeaderTwo>Primary Win</HeaderTwo>

          <p>What was great about your week? What was a solid win for you?</p>

          <ReviewElement
            id={win ? win.id : 'win-new'}
            value={win?.item}
            placeholder="Enter your win for the week"
            formType="win"
          />
          {errors && errors.id === win?.id ? (
            <div className="text-sm text-error mb-6 h-5">
              {errors ? errors.msg : ''}
            </div>
          ) : null}

          <ListSection
            items={improvements}
            errors={errors}
            title="Tasks and Areas to Improve"
            info="What tasks were not completed? What areas can you improve next week?"
            formType="improvements"
          />

          <ListSection
            items={learningpoints}
            errors={errors}
            title="Learning Points"
            info="List the things that you learned from or the ways you improved this week."
            formType="learningpoints"
          />

          <HeaderTwo>Refocus for Next Week</HeaderTwo>
          <p>What can you do to focus for next week?</p>

          <ReviewElement
            id={refocus ? refocus.id : 'refocus-new'}
            value={refocus?.item}
            placeholder="What will you refocus on next week?"
            formType="refocus"
          />
          {errors && errors.id === refocus?.id ? (
            <div className="text-sm text-error mb-6 h-5">
              {errors ? errors.msg : ''}
            </div>
          ) : null}
        </div>
      </Container>
    </>
  )
}
