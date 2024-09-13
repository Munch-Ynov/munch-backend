import { Auth, Role } from '@prisma/client'

export interface Payload {
    authId: string
    role: Role
}

export type AccessToken = string
export type RefreshToken = string

export abstract class AuthService {
    login: (
        email: string,
        password: string
    ) => Promise<{
        accessToken: AccessToken
        refreshToken: RefreshToken
        authUser: Omit<Auth, 'password'>
    }>
    refresh: (
        refreshToken: string
    ) => Promise<{ accessToken: AccessToken; refreshToken: RefreshToken }>
    validate: (payload: Payload) => Promise<Auth>
    register: (
        email: string,
        password: string,
        role: Role
    ) => Promise<{
        accessToken: AccessToken
        refreshToken: RefreshToken
        authUser: Omit<Auth, 'password'>
    }>
    createAccessToken: (auth: Auth) => Promise<string>
    createRefreshToken: (auth: Auth) => Promise<string>
    deleteProfile: (authId: string) => Promise<void>
}
