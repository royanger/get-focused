import * as React from 'react'
import { useSearchParams } from 'remix'
import {
  formatDateForDailyNav,
  formatDate,
  startDateAndEndDateFromWeek,
  createDateInstance,
  createDateFromWeekAndYear,
  returnNextAndPreviousWeeks,
} from '~/libs/dateFunctions'
import BackIcon from '../icons/BackIcon'
import ForwardIcon from '../icons/ForwardIcon'

export default function DailyNav({ week }: DailyNav) {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleClick(date: string) {
    if (date !== 'back' && date !== 'next') {
      searchParams.set('date', date)
      setSearchParams(searchParams, { replace: true })
    } else if (date === 'next' || date === 'back') {
      const activeDate = searchParams.get('date')
        ? createDateInstance(searchParams.get('date')!)
        : createDateInstance('today')
      const newWeek =
        date === 'next'
          ? returnNextAndPreviousWeeks(
              createDateFromWeekAndYear(
                activeDate.weekNumber,
                activeDate.weekYear
              )
            ).next
          : returnNextAndPreviousWeeks(
              createDateFromWeekAndYear(
                activeDate.weekNumber,
                activeDate.weekYear
              )
            ).prev
      searchParams.set(
        'date',
        formatDate(
          startDateAndEndDateFromWeek(newWeek.week, newWeek.year).start
        )
      )
      setSearchParams(searchParams, { replace: true })
    }
  }

  const weekdayDivs = week.map(day => {
    // set current day as active if user hasn't navigated to another day
    const selectedDate = searchParams.get('date')
      ? createDateInstance(searchParams.get('date')!).toString().split('T')[0]
      : createDateInstance('today').toString().split('T')[0]

    const currentDayHighlight =
      selectedDate === day.toString().split('T')[0]
        ? 'bg-purple-300'
        : 'bg-purple'

    return (
      <React.Fragment key={day}>
        <div
          className={`bg-purple text-white font-bold text-lg mx-[2px] grow h-12 items-center justify-center flex ${currentDayHighlight}`}
        >
          <button
            onClick={() => handleClick(formatDate(day))}
            className="flex  flex-col"
          >
            {formatDateForDailyNav(day.toString().split('T')[0]).dayName}
            <span className="text-xs">
              {formatDateForDailyNav(day.toString().split('T')[0]).shortDate}
            </span>
          </button>
        </div>
      </React.Fragment>
    )
  })

  return (
    <div key="back" className=" flex flex-row">
      <div className="font-bold mx-[2px] grow h-8 flex items-end">
        <button
          className="relative h-full w-full flex justify-end text-purple"
          onClick={e => handleClick('back')}
        >
          <BackIcon className="h-20  absolute -top-[16px] mr-2" />
        </button>
      </div>
      {weekdayDivs}
      <div
        key="next"
        className="font-bold mx-[2px] grow h-8 items-center justify-center flex"
      >
        <button
          className="relative h-full w-full flex justify-start text-purple"
          onClick={e => handleClick('next')}
        >
          <ForwardIcon className="h-20 absolute -top-[16px] ml-2" />
        </button>
      </div>
    </div>
  )
}
