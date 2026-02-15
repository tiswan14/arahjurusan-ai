type Entry = {
    count: number
    expiresAt: number
}

const store = new Map<string, Entry>()

export function rateLimit(key: string, limit: number, windowMs: number) {
    const now = Date.now()
    const entry = store.get(key)

    if (!entry || entry.expiresAt < now) {
        store.set(key, {
            count: 1,
            expiresAt: now + windowMs,
        })
        return { allowed: true }
    }

    if (entry.count >= limit) {
        return { allowed: false }
    }

    entry.count += 1
    return { allowed: true }
}
