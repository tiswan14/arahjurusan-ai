import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'

export async function getAuthUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) return null

    try {
        const payload = await verifyToken(token)

        return {
            id: payload.id as string,
            email: payload.email as string,
            role: payload.role as string,
        }
    } catch {
        return null
    }
}

export async function requireRole(role: string) {
    const user = await getAuthUser()

    if (!user || user.role !== role) {
        return null
    }

    return user
}
