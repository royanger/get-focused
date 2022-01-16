import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

export default function DoughnutChart({ data }) {
  ChartJS.register(ArcElement, Tooltip, Legend)

  return (
    <div className="border-purple border-2 w-96 h-96">
      <Doughnut data={data} />
    </div>
  )
}
