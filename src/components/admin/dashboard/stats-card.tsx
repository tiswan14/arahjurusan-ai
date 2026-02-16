'use client'

import { Users, TrendingUp, BookOpen, Shield, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const statsData = [
  { title: 'Total Users', value: '1,245', growth: '+12%', icon: Users },
  { title: 'Tes Minat', value: '3,820', growth: '+8%', icon: TrendingUp },
  { title: 'Jurusan Aktif', value: '6', growth: 'Stabil', icon: BookOpen },
  { title: 'Admin Aktif', value: '3', growth: '+1', icon: Shield },
]

export default function StatsCards() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className='border border-gray-200 bg-white shadow-sm'
        >
          <CardContent className='p-4'>
            <div className='mb-2 flex items-center justify-between'>
              <div className='rounded-lg bg-blue-100 p-2'>
                <stat.icon className='h-4 w-4 text-blue-600' />
              </div>

              <span className='flex items-center gap-1 text-xs text-green-600'>
                {stat.growth}
                <ArrowUpRight className='h-3 w-3' />
              </span>
            </div>

            <p className='mb-1 text-sm text-gray-600'>
              {stat.title}
            </p>

            <h3 className='text-xl font-semibold text-gray-900'>
              {stat.value}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>

  )
}
