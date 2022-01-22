import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

export default function DoughnutChart({ data }) {
  ChartJS.register(ArcElement, Tooltip, Legend)

  return (
    <div className="w-full h-auto">
      <Doughnut data={data} />
    </div>
  )
}
