import { createMock } from '@golevelup/ts-jest'
import { Auth } from './model/auth.model'
import { Role } from './model/role-enum'

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
    ) => Promise<{ accessToken: AccessToken; refreshToken: RefreshToken }>
    refresh: (
        refreshToken: string
    ) => Promise<{ accessToken: AccessToken; refreshToken: RefreshToken }>
    validate: (payload: Payload) => Promise<Auth>
    register: (email: string, password: string, role: Role) => Promise<Auth>
    createAccessToken: (auth: Auth) => Promise<string>
    createRefreshToken: (auth: Auth) => Promise<string>
}
