import DashboardHeader from '@/components/admin/dashboard/dashboard-header'
import StatsCards from '@/components/admin/dashboard/stats-card'
import UserGrowthChart from '@/components/admin/dashboard/user-growth-chart'
import JurusanPieChart from '@/components/admin/dashboard/jurusan-pie-chart'

export default function DashboardPage() {
  return (
    <div className='flex h-screen flex-col overflow-hidden bg-gray-50 p-12 text-gray-900'>
      <div className='space-y-4'>
        <DashboardHeader />
        <StatsCards />
      </div>

      <div className='mt-6 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2'>
        <UserGrowthChart />
        <JurusanPieChart />
      </div>
    </div>

  )
}

