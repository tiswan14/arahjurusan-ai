'use client'

import { GraduationCap } from 'lucide-react'
import { adminSidebar } from './sidebar-config'
import SidebarItem from './sidebar-item'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Sidebar() {
  return (
    <aside className='fixed left-0 top-0 h-screen w-64 border-r border-border bg-background flex flex-col'>

      {/* Header / Branding */}
      <Card className='rounded-none border-0 border-b border-border bg-background shadow-none'>
        <div className='h-8 flex items-center gap-4 px-6'>

          <div className='relative'>
            <div className='flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/10 ring-1 ring-primary/10 transition-all duration-300 hover:ring-primary/30'>
              <GraduationCap className='w-6 h-6 text-primary' />
            </div>

            <div className='absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full border-2 border-background' />
          </div>

          <div className='flex flex-col leading-tight'>
            <span className='text-base font-semibold text-foreground tracking-tight'>
              ArahJurusan
            </span>
            <span className='text-xs text-muted-foreground font-medium'>
              Admin Panel
            </span>
          </div>

        </div>
      </Card>

      {/* Navigation */}
      <div className='flex-1 px-4 py-6 overflow-y-auto'>
        <nav className='space-y-2'>
          {adminSidebar.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className='px-6 py-4'>
        <Separator className='mb-3' />
        <p className='text-xs text-muted-foreground'>
          © {new Date().getFullYear()} ArahJurusan
        </p>
      </div>

    </aside>
  )
}
