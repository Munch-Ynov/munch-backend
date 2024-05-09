import { Role } from '@/models'
import { Auth } from 'src/data/models/auth.model'
export interface Payload {
    authId: string
    role: Role
}

export type accessToken = string
export type refreshToken = string

export abstract class AuthProvider {
    login: (
        email: string,
        password: string
    ) => Promise<{ accessToken: accessToken; refreshToken: refreshToken }>
    refresh: (
        refreshToken: string
    ) => Promise<{ accessToken: accessToken; refreshToken: refreshToken }>
    validate: (payload: Payload) => Promise<Auth>
    register: (email: string, password: string, role: Role) => Promise<Auth>
}
