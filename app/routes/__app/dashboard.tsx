import { LoaderFunction, redirect, useLoaderData } from 'remix'
import { authenticator } from '~/services/auth.server'
import BarChart from '~/components/dashboard/BarChart'
import DoughnutChart from '~/components/dashboard/DoughnutChart'
import { Tab as HeadlessTab } from '@headlessui/react'
import Tab from '~/components/dashboard/Tab'
import Container from '~/components/Container'
import { HeaderOne, HeaderTwo } from '~/components/Headlines'
import { generateWellnessData } from '~/libs/dashboard/wellness'
import { generateProductivityData } from '~/libs/dashboard/productivity'
import { generateExerciseData } from '~/libs/dashboard/exercise'
import { generateTasksData } from '~/libs/dashboard/tasks'
import { DateTime } from 'luxon'

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect('/')
  }

  const [wellness, productivity, exercise, tasks] = await Promise.all([
    generateWellnessData(user.id),
    generateProductivityData(user.id),
    generateExerciseData(user.id),
    generateTasksData(user.id),
  ])

  return { wellness, productivity, exercise, tasks }
}

export default function Dashboard() {
  const { wellness, productivity, exercise, tasks } = useLoaderData()

  console.log('datetime', DateTime.now().toISO())

  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Dashboard</HeaderOne>

          <HeadlessTab.Group>
            <div className="w-full">
              <HeadlessTab.List>
                <Tab title="Current Month" />
                <Tab title="Previous Month" />
                <Tab title="Year to Date" />
              </HeadlessTab.List>
              <HeadlessTab.Panels>
                <HeadlessTab.Panel className="grid grid-cols-3 ">
                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px] ">
                    <HeaderTwo>Productivity</HeaderTwo>
                    <DoughnutChart data={productivity} />
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px]">
                    <HeaderTwo>Exercise</HeaderTwo>
                    <BarChart data={exercise} title="Exercise Activity" />
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px]">
                    <HeaderTwo>Wellness</HeaderTwo>
                    <DoughnutChart data={wellness} />
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px]">
                    <HeaderTwo>Tasks by Month</HeaderTwo>
                    <DoughnutChart data={tasks?.monthly} />
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px]">
                    <HeaderTwo>Tasks By Week</HeaderTwo>
                    <DoughnutChart data={tasks?.tasksByWeek} />
                  </div>
                </HeadlessTab.Panel>
                <HeadlessTab.Panel>Content 2</HeadlessTab.Panel>
                <HeadlessTab.Panel>Content 3</HeadlessTab.Panel>
              </HeadlessTab.Panels>
            </div>
          </HeadlessTab.Group>
        </div>
      </Container>
    </>
  )
}
