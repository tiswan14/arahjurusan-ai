'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { SidebarItemConfig } from './sidebar.types'

const normalizePath = (path: string) => {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1)
  }

  return path
}

export default function SidebarItem({
  name,
  href,
  icon: Icon,
}: SidebarItemConfig) {
  const pathname = normalizePath(usePathname())
  const normalizedHref = normalizePath(href)

  const isActive = pathname === normalizedHref

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      {isActive && (
        <span className='absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-blue-600' />
      )}

      <Icon
        className={cn(
          'h-4 w-4 shrink-0 transition-colors',
          isActive ? 'text-blue-700' : 'text-gray-500',
        )}
      />

      <span>{name}</span>
    </Link>
  )
}
