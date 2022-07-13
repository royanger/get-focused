import { ForwardIcon, BackIcon } from '../icons'
import { useSearchParams } from '@remix-run/react'

export default function WeeklyNav({ navigation, week, dates }: WeeklyNav) {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleClick(type: string) {
    // this appears to resolve the current type error, but creates a new one
    //   if ( type === 'next') {
    //    searchParams.set('year', navigation['forward'].year)
    //    searchParams.set('week', navigation['forward'].week)
    //   }
    searchParams.set('year', navigation[type].year)
    searchParams.set('week', navigation[type].week)
    setSearchParams(searchParams, { replace: true })
  }

  return (
    <div className="flex justify-center">
      <div className="mb-12 flex h-10 w-8/12">
        <div className="w-12 ">
          <button
            className="relative h-full w-full flex justify-center text-purple hover:text-purple-100"
            onClick={e => handleClick('back')}
          >
            <BackIcon className="h-20 absolute -top-[13px]" />
          </button>
        </div>
        <div className="flex flex-col grow border-2  bg-purple text-white text-lg font-bold h-14 items-center justify-center">
          <div>Week {week}</div>
          <div className="text-xs">{dates}</div>
        </div>

        <div className="w-12">
          <button
            className="relative h-full w-full flex justify-center text-purple hover:text-purple-100"
            onClick={e => handleClick('forward')}
          >
            <ForwardIcon className="h-20 absolute -top-[13px] " />
          </button>
        </div>
      </div>
    </div>
  )
}
