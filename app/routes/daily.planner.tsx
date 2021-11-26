import { useLoaderData } from 'remix'
import Container from '~/components/container'
import Button from '~/components/button'
import { HeaderOne, HeaderTwo } from '~/components/headlines'
import { getDate } from '~/libs/getDate'
import { findTasks } from '~/queries/findTasks'
import { db } from '../../prisma/db'

export let loader = async () => {
  let date = getDate()

  // TODO This needs to be replaced -- hardcoded userId
  // userId for my user for testing
  let user = '267744ec-215f-4012-812b-ddfba3704257'

  let tasks = await findTasks('0c0ece7f-4eb5-40d6-8400-c1bf6fb37937', user)

  console.log(tasks)
  //   return {
  //     tasks: dailyTasks,
  //     wellness: wellness,
  //     exercise: exercise,
  //     notes: notes,
  //     productivity: productivity,
  //   }
  return 'test'
}

export default function DailyPlanner() {
  let data = useLoaderData()
  console.log(data)
  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Daily Planner</HeaderOne>

          <HeaderTwo>How do you feel?</HeaderTwo>
          <p>Rate how you are feeling out of 10.</p>
          {/* <p>From DB: {data?.wellness && data.wellness[0]?.rating}</p> */}
          <div className="flex-shrink flex">
            <div className="grid grid-cols-10 mb-6">
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>

              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>

          <HeaderTwo>Did you exercise today?</HeaderTwo>
          {/* <p>From DB: {data?.exercise[0]?.completed ? 'true' : 'false'}</p> */}

          <div>
            <input type="checkbox" /> Yes
          </div>
          <div>
            <input type="checkbox" /> No
          </div>

          <HeaderTwo>What is your most important goal(s) today?</HeaderTwo>
          <p>Try to focus on one goal, but you can focus on a few.</p>

          {/* <p>From DB: {data?.tasks && data.tasks[0]?.name}</p> */}
          {/* <p>From DB: {data?.task[1]?.name && data.task[1].name}</p> */}

          <div>
            <div className="flex flex-row items-center">
              <div className="flex-grow flex">
                <input
                  className="border-2 border-purple p-2 text-black rounded flex-grow"
                  type="text"
                  placeholder="Important Goals"
                  aria-label="Important Goals"
                />
              </div>
              <div className="w-8 flex flex-row justify-center ">
                <input type="checkbox" />
              </div>
              <div className="w-32 flex flex-row justify-center ">
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
              </div>
              <div className="w-8 flex flex-row justify-center ">
                <input type="checkbox" />
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex-grow"></div>
              <div className="text-xs w-8 flex flex-row justify-center ">
                Target
              </div>
              <div className="text-xs w-32 flex flex-row justify-center ">
                Track your time
              </div>
              <div className="text-xs w-8 flex flex-row justify-center ">
                Actual
              </div>
            </div>
          </div>

          <Button title="Save" />

          <Button title="Cancel" variant="cancel" />

          <HeaderTwo>Important Goals and Tasks</HeaderTwo>
          <p>
            These tasks and goals are secondary to your most important goal, but
            are things you really want to finish today.
          </p>

          <HeaderTwo>Bonus Goals and Tasks</HeaderTwo>
          <p>
            If you finish all of the above tasks and goals, what are some tasks
            that would be awesome to finish today?
          </p>

          <HeaderTwo>Notes</HeaderTwo>
          <p>
            Jot down any notes. These will be shown on the Weekly Review and can
            be accessed through your dashboard.
          </p>
          <input
            type="textarea"
            className="w-full h-36 border-2 border-purple rounded"
          />
          <Button title="Save" />

          <Button title="Cancel" variant="cancel" />

          <HeaderTwo>Productivity Score?</HeaderTwo>
          <p>Rate how you productive you felt out of 10.</p>
          {/* <p>From DB: {data?.productivity && data.productivity[0]?.score}</p> */}
          <div className="flex-shrink flex">
            <div className="grid grid-cols-10 mb-6">
              <div>
                <input className="mx-2" type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}