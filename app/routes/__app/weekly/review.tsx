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
import WeeklyNav from '~/components/weekly/weeklyNav'

// actions
import { validateWinsForm } from '~/libs/weekly/winsActions'
import { validateImprovementsForm } from '~/libs/weekly/improvementsActions'
import { validateLearningPointsForm } from '~/libs/weekly/learningPointsActions'
import { validateRefocusForm } from '~/libs/weekly/refocusActions'

// components
import Container from '~/components/container'
import { HeaderOne, HeaderTwo } from '~/components/headlines'
import ReviewElement from '~/components/weekly/reviewElement'
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
    week = parseInt(url.searchParams.get('week'))
    year = parseInt(url.searchParams.get('year'))
  }

  const weekResults = await findOrCreateWeek(year, week)
  const win = findWin(weekResults.id, user.id)
  const improvements = findImprovements(weekResults.id, user.id)
  const learningpoints = findLearningPoints(weekResults.id, user.id)
  const refocus = findRefocus(weekResults.id, user.id)

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

  return null
}

export default function WeeklyReview() {
  const data = useLoaderData()
  const errors = useActionData()

  const [searchParams, setSearchParams] = useSearchParams()
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
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <HeaderTwo>Primary Win</HeaderTwo>

          <p>What was great about your week? What was a solid win for you?</p>

          <ReviewElement
            id={data?.win ? data.win.id : 'win-new'}
            value={data?.win?.item}
            placeholder="Enter your win for the week"
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
            value={data?.refocus?.item}
            placeholder="What will you refocus on next week?"
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
