import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const users = Array.from({ length: 20 }).map(() => ({
        nama: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: '',
        role: 'user',
    }))

    for (const user of users) {
        const hashed = await bcrypt.hash('password123', 10)

        await prisma.user.create({
            data: {
                ...user,
                password: hashed,
            },
        })
    }

    console.log('20 users seeded')
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect()
    })
