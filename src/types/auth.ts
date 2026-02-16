export type Role = 'admin' | 'user'

export type AuthUser = {
    nama: string
    email: string
    role: Role
}
