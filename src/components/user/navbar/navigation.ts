export type NavigationItem = {
  name: string
  href: string
  dropdown?: {
    name: string
    href: string
  }[]
}

export const navigation: NavigationItem[] = [
  { name: 'Beranda', href: '/' },
  {
    name: 'Jurusan',
    href: '/jurusan',
    dropdown: [
      { name: 'Rekayasa Perangkat Lunak', href: '/jurusan/rpl' },
      { name: 'Teknik Komputer Jaringan', href: '/jurusan/tkj' },
      { name: 'Multimedia', href: '/jurusan/multimedia' },
      { name: 'Akuntansi', href: '/jurusan/akuntansi' },
      { name: 'Pemasaran', href: '/jurusan/pemasaran' },
      { name: 'Semua Jurusan', href: '/jurusan' },
    ],
  },
  { name: 'Tes Minat', href: '/tes-minat' },
  { name: 'Mitra Industri', href: '/mitra' },
  { name: 'Tentang', href: '/tentang' },
  { name: 'Kontak', href: '/kontak' },
]
