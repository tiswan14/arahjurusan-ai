import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  Settings,
  BarChart3,
  ClipboardList,
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
    name: 'Bobot Jurusan',
    href: '/dashboard/weights',
    icon: BarChart3,
  },
  {
    name: 'Soal',
    href: '/dashboard/questions',
    icon: FileText,
  },

  {
    name: 'Hasil Tes',
    href: '/dashboard/results',
    icon: ClipboardList,
  },
  {
    name: 'Pengaturan',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

