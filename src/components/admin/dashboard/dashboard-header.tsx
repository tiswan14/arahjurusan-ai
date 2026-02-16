'use client'

import { Activity } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-3xl font-semibold text-gray-900'>
          Dashboard
        </h1>

        <p className='mt-2 flex items-center gap-2 text-gray-600'>
          <Activity className='w-4 h-4 text-gray-500' />
          Ringkasan aktivitas dan statistik sistem
        </p>
      </div>
    </div>
  )
}
