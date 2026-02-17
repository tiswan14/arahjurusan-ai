const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    const jurusanList = [
      {
        nama: 'Geologi Pertambangan',
        slug: 'geologi-pertambangan',
        alias: 'GP',
        deskripsi:
          'Mempelajari eksplorasi sumber daya tambang, pemetaan geologi, serta teknik dasar pertambangan.',
        prospekKerja:
          'Surveyor Tambang, Teknisi Geologi, Operator Tambang, Quality Control Tambang',
      },
      {
        nama: 'Multimedia Broadcasting dan Perfilman',
        slug: 'multimedia-broadcasting-dan-perfilman',
        alias: 'BC',
        deskripsi:
          'Fokus pada produksi video, editing, desain grafis, animasi, dan penyiaran.',
        prospekKerja:
          'Video Editor, Content Creator, Cameraman, Animator, Graphic Designer',
      },
      {
        nama: 'Teknik Instalasi Tenaga Listrik',
        slug: 'teknik-instalasi-tenaga-listrik',
        alias: 'TITL',
        deskripsi:
          'Mempelajari instalasi listrik rumah, industri, dan perawatan sistem tenaga listrik.',
        prospekKerja:
          'Teknisi Listrik, Electrical Maintenance, Teknisi Panel, Kontraktor Listrik',
      },
      {
        nama: 'Teknik Kendaraan Ringan',
        slug: 'teknik-kendaraan-ringan',
        alias: 'TKR',
        deskripsi:
          'Fokus pada perawatan dan perbaikan mesin kendaraan ringan.',
        prospekKerja:
          'Mekanik Mobil, Teknisi Bengkel, Service Advisor, Wirausaha Otomotif',
      },
      {
        nama: 'Otomatisasi dan Tata Kelola Perkantoran',
        slug: 'otkp',
        alias: 'OTKP',
        deskripsi:
          'Mempelajari administrasi perkantoran, pengarsipan, dan manajemen dokumen.',
        prospekKerja:
          'Staff Administrasi, Sekretaris, Data Entry, Customer Service',
      },
      {
        nama: 'Bisnis Daring dan Pemasaran',
        slug: 'bisnis-daring-dan-pemasaran',
        alias: 'BDP',
        deskripsi:
          'Fokus pada strategi pemasaran digital, penjualan online, dan manajemen bisnis.',
        prospekKerja:
          'Digital Marketer, Sales Online, Admin Marketplace, Entrepreneur',
      },
      {
        nama: 'Usaha Layanan Pariwisata',
        slug: 'usaha-layanan-pariwisata',
        alias: 'ULP',
        deskripsi:
          'Mempelajari pelayanan wisata, guiding, dan manajemen perjalanan.',
        prospekKerja:
          'Tour Guide, Staff Travel Agent, Event Organizer, Front Office',
      },
      {
        nama: 'Teknik Elektronika Industri',
        slug: 'teknik-elektronika-industri',
        alias: 'TEI',
        deskripsi:
          'Fokus pada sistem kontrol industri, PLC, dan perawatan perangkat elektronik.',
        prospekKerja:
          'Teknisi PLC, Maintenance Industri, Teknisi Elektronika',
      },
      {
        nama: 'Teknik Kimia Industri',
        slug: 'teknik-kimia-industri',
        alias: 'TKIN',
        deskripsi:
          'Mempelajari proses produksi berbasis kimia di industri manufaktur.',
        prospekKerja:
          'Operator Produksi, Quality Control, Teknisi Laboratorium Industri',
      },
      {
        nama: 'Desain Komunikasi Visual',
        slug: 'desain-komunikasi-visual',
        alias: 'DKV',
        deskripsi:
          'Fokus pada desain grafis, branding, ilustrasi, dan komunikasi visual.',
        prospekKerja:
          'Graphic Designer, Illustrator, UI Designer, Creative Staff',
      },
    ]

    for (const item of jurusanList) {
      await prisma.jurusan.upsert({
        where: { slug: item.slug },
        update: {},
        create: item,
      })
    }

    console.log('Seed jurusan berhasil')
  } catch (error) {
    console.error('Seed jurusan gagal:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
