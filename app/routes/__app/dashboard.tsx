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

export const loader = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect('/')
  }

  let data = {}
  await Promise.all([
    generateWellnessData(user.id),
    //  findExerciseEntries(dateResults.id, user.id),
    //  findTasksEntries(dateResults.id, user.id),
    //  findNotesEntries(dateResults.id, user.id),
    //  findProductivityEntries(dateResults.id, user.id),
  ]).then(results => {
    data.wellness = results[0]
    //  data.exercise = results[1]
    //  data.tasks = results[2]
    //  data.notes = results[3]
    //  data.productivity = results[4]
  })

  return data
}

export default function Dashboard() {
  const data = useLoaderData()
  console.log('DATA', data)
  const exerciseData = {
    labels: ['Week 1', 'Week 1', 'Week 3'],
    datasets: [
      {
        label: 'Yes',
        data: [4, 19, 7],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'No',
        data: [2, 9, 7],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const wellnessData = {
    labels: ['2', '4', '5', '6', '8', '9'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, 4, 7, 13, 5, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        //   borderColor: [
        //     'rgba(255, 99, 132, 1)',
        //     'rgba(54, 162, 235, 1)',
        //     'rgba(255, 206, 86, 1)',
        //     'rgba(75, 192, 192, 1)',
        //     'rgba(153, 102, 255, 1)',
        //     'rgba(255, 159, 64, 1)',
        //   ],
        borderWidth: 1,
      },
    ],
  }

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
                    <DoughnutChart data={wellnessData} />
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px]">
                    <HeaderTwo>Exercise</HeaderTwo>
                    <BarChart data={exerciseData} title="Exercise Activity" />
                  </div>

                  <div className="m-4 p-2 drop-shadow-xl bg-purewhite border-grey-200 border-[1px]">
                    <HeaderTwo>Wellness</HeaderTwo>
                    <DoughnutChart data={wellnessData} />
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
