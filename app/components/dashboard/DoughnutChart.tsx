import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

export default function DoughnutChart({
  data,
}: ChartData<'doughnut', number[], number>) {
  ChartJS.register(ArcElement, Tooltip, Legend)

  return (
    <div className="w-full h-auto">
      <Doughnut data={data} />
    </div>
  )
}
