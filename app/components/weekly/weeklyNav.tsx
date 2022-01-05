import ForwardIcon from '../icons/forward'
import BackIcon from '../icons/back'

interface WeeklyNav {
  navigation: {
    back: {
      year: number
      week: number
    }
    forward: {
      year: number
      week: number
    }
  }
  dates: string
  setSearchParams
}

export default function WeeklyNav({
  navigation,
  dates,
  searchParams,
  setSearchParams,
}: WeeklyNav) {
  function handleClick(type) {
    searchParams.set('year', navigation[type].year)
    searchParams.set('week', navigation[type].week)
    setSearchParams(searchParams, { replace: true })
  }

  return (
    <>
      <div className="mb-4 flex h-10">
        <div className="w-12">
          <button
            className="relative h-full w-full flex justify-center"
            onClick={e => handleClick('back')}
          >
            <BackIcon classes="h-12 text-purple-300 absolute -top-[5px] " />
          </button>
        </div>
        <div className=" flex grow border-2 mx-8 border-purple text-lg font-bold h-10 items-center justify-center">
          {dates}
        </div>

        <div className="mb-4 flex h-10">
          <div className="w-12">
            <button
              className="relative h-full w-full flex justify-center"
              onClick={e => handleClick('forward')}
            >
              <ForwardIcon classes="h-12 text-purple-300 absolute -top-[5px] " />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}