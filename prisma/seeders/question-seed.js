const { PrismaClient, Dimensi } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    const questions = [
      // logika
      { text: 'Saya suka memecahkan masalah yang kompleks', dimensi: Dimensi.logika, urutan: 1 },
      { text: 'Saya menikmati mencari pola dalam data', dimensi: Dimensi.logika, urutan: 2 },
      { text: 'Saya tertarik memahami cara kerja suatu sistem', dimensi: Dimensi.logika, urutan: 3 },

      // numerik
      { text: 'Saya nyaman bekerja dengan angka', dimensi: Dimensi.numerik, urutan: 4 },
      { text: 'Saya menikmati pelajaran matematika', dimensi: Dimensi.numerik, urutan: 5 },
      { text: 'Saya suka menghitung atau menganalisis data', dimensi: Dimensi.numerik, urutan: 6 },

      // kreatif
      { text: 'Saya suka membuat ide baru', dimensi: Dimensi.kreatif, urutan: 7 },
      { text: 'Saya menikmati mendesain sesuatu', dimensi: Dimensi.kreatif, urutan: 8 },
      { text: 'Saya tertarik pada seni atau konten kreatif', dimensi: Dimensi.kreatif, urutan: 9 },

      // sosial
      { text: 'Saya senang membantu orang lain', dimensi: Dimensi.sosial, urutan: 10 },
      { text: 'Saya nyaman berbicara di depan umum', dimensi: Dimensi.sosial, urutan: 11 },
      { text: 'Saya suka bekerja dalam tim', dimensi: Dimensi.sosial, urutan: 12 },

      // teknis
      { text: 'Saya suka merakit atau memperbaiki sesuatu', dimensi: Dimensi.teknis, urutan: 13 },
      { text: 'Saya lebih suka praktik daripada teori', dimensi: Dimensi.teknis, urutan: 14 },
      { text: 'Saya tertarik dengan teknologi dan alat', dimensi: Dimensi.teknis, urutan: 15 },
    ]

    for (const item of questions) {
      await prisma.question.upsert({
        where: { urutan: item.urutan },
        update: {},
        create: {
          ...item,
          aktif: true,
        },
      })
    }

    console.log('Seed question berhasil')
  } catch (error) {
    console.error('Seed question gagal:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
