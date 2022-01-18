import * as React from 'react'
import { redirect, useLoaderData } from 'remix'
import { authenticator } from '~/services/auth.server'
import Chart from '~/components/dashboard/pieChart'
import BarChart from '~/components/dashboard/barChart'
import DoughnutChart from '~/components/dashboard/doughnutChart'
import { Tab as HeadlessTab } from '@headlessui/react'
import Tab from '~/components/dashboard/tab'
import Container from '~/components/container'
import { HeaderOne, HeaderTwo } from '~/components/headlines'
import { generateWellnessData } from '~/libs/dashboard/wellness'
import { generateProductivityData } from '~/libs/dashboard/productivity'
import { generateExerciseData } from '~/libs/dashboard/exercise'

export const loader = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect('/')
  }

  let data = {}
  await Promise.all([
    generateWellnessData(user.id),
    generateProductivityData(user.id),
    generateExerciseData(user.id),
    //  findExerciseEntries(dateResults.id, user.id),
    //  findTasksEntries(dateResults.id, user.id),
    //  findNotesEntries(dateResults.id, user.id),
    //  findProductivityEntries(dateResults.id, user.id),
  ]).then(results => {
    data.wellness = results[0]
    data.productivity = results[1]
    data.exercise = results[2]
    //  data.tasks = results[2]
    //  data.notes = results[3]
    //  data.productivity = results[4]
  })

  return data
}

export default function Dashboard() {
  const data = useLoaderData()

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
                    <DoughnutChart data={data?.productivity} />
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px]">
                    <HeaderTwo>Exercise</HeaderTwo>
                    <BarChart data={data?.exercise} title="Exercise Activity" />
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px]">
                    <HeaderTwo>Wellness</HeaderTwo>
                    <DoughnutChart data={data?.wellness} />
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
