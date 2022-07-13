import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { ChartData } from 'chart.js'
import { Bar } from 'react-chartjs-2'

interface Props {
  data: ChartData<'bar', number[], unknown>
  title: string
}

export default function BarChart({ data, title }: Props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  return (
    <div className="w-full h-auto">
      <Bar options={options} data={data} />
    </div>
  )
}
