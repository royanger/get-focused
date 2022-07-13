import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { ChartDataset } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

interface Props {
  data: Data
}

interface Data {
  labels: string[] | undefined
  datasets: ChartDataset<'doughnut', number[]>[]
}

export default function DoughnutChart({ data }: Props) {
  ChartJS.register(ArcElement, Tooltip, Legend)

  return (
    <div className="w-full h-auto">
      <Doughnut data={data} />
    </div>
  )
}
