import React from 'react'
import {
  formatDateForDailyNav,
  formatDate,
  startDateAndEndDateFromWeek,
  createDateInstance,
  createDateFromWeekAndYear,
  returnNextAndPreviousWeeks,
} from '~/libs/dateFunctions'
import BackIcon from '../icons/back'
import ForwardIcon from '../icons/forward'

export default function DailyNav({ week, searchParams, setSearchParams }) {
  function handleClick(date) {
    if (date !== 'back' && date !== 'next') {
      searchParams.set('date', date)
      setSearchParams(searchParams, { replace: true })
    } else if (date === 'next' || date === 'back') {
      const activeDate = searchParams.get('date')
        ? createDateInstance(searchParams.get('date'))
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
        formatDate(startDateAndEndDateFromWeek(newWeek.week).start)
      )
      setSearchParams(searchParams, { replace: true })
    }
  }

  const weekdayDivs = week.map(day => {
    const currentDayHighlight =
      formatDate(new Date(searchParams.get('date'))) === formatDate(day)
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
            {formatDateForDailyNav(day).dayName}
            <span className="text-xs">
              {formatDateForDailyNav(day).shortDate}
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
          className="relative h-full w-full flex justify-end"
          onClick={e => handleClick('back')}
        >
          <BackIcon classes="h-20 text-purple absolute -top-[16px] mr-2" />
        </button>
      </div>
      {weekdayDivs}
      <div
        key="next"
        className="font-bold mx-[2px] grow h-8 items-center justify-center flex"
      >
        <button
          className="relative h-full w-full flex justify-start"
          onClick={e => handleClick('next')}
        >
          <ForwardIcon classes="h-20 text-purple absolute -top-[16px] ml-2" />
        </button>
      </div>
    </div>
  )
}
