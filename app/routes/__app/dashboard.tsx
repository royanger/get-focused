import * as React from 'react'
import { redirect } from 'remix'
import { authenticator } from '~/services/auth.server'
import Chart from '~/components/dashboard/chart'
import BarChart from '~/components/dashboard/barChart'
import DoughnutChart from '~/components/dashboard/doughnutChart'

export const loader = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect('/')
  }

  return null
}

export default function Dashboard() {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const wellnessLabels = ['5', '7', '8']
  const exerciseData = {
    labels: ['Current Month', 'Previous Month', 'Year to Date'],
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
      <h1 className="text-blue"> Productivity App</h1>
      <p>This is some text</p>
      <div>
        <Chart data={data} />
        <BarChart data={exerciseData} title="Exercise Activity" />
        <DoughnutChart data={wellnessData} />
      </div>
    </>
  )
}
