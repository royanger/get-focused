import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { authenticator } from '../../services/auth.server'
import BarChart from '../../components/dashboard/BarChart'
import DoughnutChart from '../../components/dashboard/DoughnutChart'
import { Tab as HeadlessTab } from '@headlessui/react'
import Tab from '../../components/dashboard/Tab'
import Container from '../../components/Container'
import { HeaderOne, HeaderTwo } from '../../components/Headlines'
import { generateWellnessData } from '../../libs/dashboard/wellness'
import { generateProductivityData } from '../../libs/dashboard/productivity'
import { generateExerciseData } from '../../libs/dashboard/exercise'
import { generateTasksData } from '../../libs/dashboard/tasks'

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
                <HeadlessTab.Panel className="grid grid-cols-3 gap-y-8">
                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px] flex flex-col h-full">
                    <HeaderTwo>Productivity</HeaderTwo>
                    <div className="grow flex items-center">
                      <DoughnutChart data={productivity} />
                    </div>
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px] flex flex-col h-full">
                    <HeaderTwo>Exercise</HeaderTwo>
                    <div className="grow flex items-end pb-10">
                      <BarChart data={exercise} title="Exercise Activity" />
                    </div>
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px] flex flex-col h-full">
                    <HeaderTwo>Wellness</HeaderTwo>
                    <div className="grow flex items-center">
                      <DoughnutChart data={wellness} />
                    </div>
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px] flex flex-col h-full">
                    <HeaderTwo>Tasks by Month</HeaderTwo>
                    <div className="grow flex items-center">
                      <DoughnutChart data={tasks?.monthly} />
                    </div>
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px] flex flex-col h-full">
                    <HeaderTwo>Tasks By Week</HeaderTwo>
                    <div className="grow flex items-center">
                      <DoughnutChart data={tasks?.tasksByWeek} />
                    </div>
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
