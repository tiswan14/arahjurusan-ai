'use client'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Growth = {
  month: string
  users: number
}

const userGrowth: Growth[] = [
  { month: 'Jan', users: 40 },
  { month: 'Feb', users: 65 },
  { month: 'Mar', users: 90 },
  { month: 'Apr', users: 120 },
  { month: 'Mei', users: 150 },
  { month: 'Jun', users: 180 },
]

export default function UserGrowthChart() {
  return (
    <Card className='flex h-full flex-col border border-gray-200 bg-white shadow-sm'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base font-semibold text-gray-900'>
          Pertumbuhan User
        </CardTitle>
      </CardHeader>

      <CardContent className='flex-1'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={userGrowth}>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#e5e7eb'
            />

            <XAxis
              dataKey='month'
              stroke='#6b7280'
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke='#6b7280'
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />

            <Area
              type='monotone'
              dataKey='users'
              stroke='#2563eb'
              fill='#3b82f6'
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
