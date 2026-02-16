import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  Settings,
} from 'lucide-react'

import type { SidebarItemConfig } from './sidebar.types'

export const adminSidebar: SidebarItemConfig[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    name: 'Jurusan',
    href: '/dashboard/jurusan',
    icon: GraduationCap,
  },
  {
    name: 'Tes Minat',
    href: '/dashboard/tes',
    icon: FileText,
  },
  {
    name: 'Pengaturan',
    href: '/dashboard/settings',
    icon: Settings,
  },
]
