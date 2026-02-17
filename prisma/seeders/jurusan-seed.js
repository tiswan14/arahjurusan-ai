import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.jurusan.upsert({
      where: { slug: 'rekayasa-perangkat-lunak' },
      update: {},
      create: {
        nama: 'Rekayasa Perangkat Lunak',
        slug: 'rekayasa-perangkat-lunak',
        alias: 'RPL',
        deskripsi:
          'Jurusan yang mempelajari pengembangan aplikasi, website, dan sistem berbasis perangkat lunak.',
        prospekKerja:
          'Software Developer, Web Developer, Mobile Developer, QA Engineer, System Analyst',
      },
    })

    await prisma.jurusan.upsert({
      where: { slug: 'teknik-komputer-dan-jaringan' },
      update: {},
      create: {
        nama: 'Teknik Komputer dan Jaringan',
        slug: 'teknik-komputer-dan-jaringan',
        alias: 'TKJ',
        deskripsi:
          'Jurusan yang fokus pada instalasi jaringan, administrasi server, dan troubleshooting perangkat komputer.',
        prospekKerja:
          'Network Engineer, IT Support, System Administrator, Teknisi Jaringan',
      },
    })

    console.log('Seed jurusan berhasil')
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
