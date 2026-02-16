'use client'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Jurusan = {
  name: string
  value: number
}

const jurusanData: Jurusan[] = [
  { name: 'RPL', value: 45 },
  { name: 'TKJ', value: 30 },
  { name: 'MM', value: 15 },
  { name: 'Akuntansi', value: 10 },
]

const COLORS: string[] = [
  '#2563eb', // blue-600
  '#7c3aed', // violet-600
  '#059669', // emerald-600
  '#ea580c', // orange-600
]

export default function JurusanPieChart() {
  return (
    <Card className='flex h-full flex-col border border-gray-200 bg-white shadow-sm'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base font-semibold text-gray-900'>
          Distribusi Jurusan
        </CardTitle>
      </CardHeader>

      <CardContent className='flex-1'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={jurusanData}
              dataKey='value'
              nameKey='name'
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              stroke='#ffffff'
              strokeWidth={2}
            >
              {jurusanData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />

            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

