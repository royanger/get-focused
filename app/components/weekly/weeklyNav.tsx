import ForwardIcon from '../icons/forward'
import BackIcon from '../icons/back'
import { useSearchParams } from 'remix'

export default function WeeklyNav({ navigation, dates }: WeeklyNav) {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleClick(type: string) {
    searchParams.set('year', navigation[type].year)
    searchParams.set('week', navigation[type].week)
    setSearchParams(searchParams, { replace: true })
  }

  return (
    <>
      <div className="mb-4 flex h-10">
        <div className="w-12">
          <button
            className="relative h-full w-full flex justify-center text-purple-300"
            onClick={e => handleClick('back')}
          >
            <BackIcon className="h-12 absolute -top-[5px] " />
          </button>
        </div>
        <div className=" flex grow border-2 mx-8 border-purple text-lg font-bold h-10 items-center justify-center">
          {dates}
        </div>

        <div className="mb-4 flex h-10">
          <div className="w-12">
            <button
              className="relative h-full w-full flex justify-center text-purple-300 "
              onClick={e => handleClick('forward')}
            >
              <ForwardIcon className="h-12 absolute -top-[5px] " />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
