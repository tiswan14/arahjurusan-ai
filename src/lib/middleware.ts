import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    const { pathname } = req.nextUrl

    // Public login route
    if (pathname === '/login') {
        if (!token) return NextResponse.next()

        try {
            const { payload } = await jwtVerify(token, secret)

            if (payload.role === 'admin') {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }

            return NextResponse.redirect(new URL('/', req.url))
        } catch {
            return NextResponse.next()
        }
    }

    // Protected routes
    if (pathname === '/' || pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url))
        }

        try {
            const { payload } = await jwtVerify(token, secret)

            // Admin only page
            if (pathname.startsWith('/dashboard') && payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/', req.url))
            }

            // User only page
            if (pathname === '/' && payload.role !== 'user') {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }

            return NextResponse.next()
        } catch {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/dashboard', '/login'],
}
