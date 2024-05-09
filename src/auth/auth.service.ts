import { Injectable, Response } from '@nestjs/common'
import {
    AuthProvider,
    Payload,
    accessToken,
    refreshToken,
} from './interface/auth-provider.interface'
import { Role } from '@/models'

@Injectable()
export class AuthService {
    constructor(private readonly authProvider: AuthProvider) {}

    async login(
        email: string,
        password: string
    ): Promise<{ accessToken: accessToken; refreshToken: refreshToken }> {
        return await this.authProvider.login(email, password)
    }

    async refresh(
        refreshToken: refreshToken
    ): Promise<{ accessToken: accessToken; refreshToken: refreshToken }> {
        return await this.authProvider.refresh(refreshToken)
    }

    async register(email: string, password: string, role: Role) {
        return await this.authProvider.register(email, password, role)
    }

    async validate(payload: Payload) {
        return await this.authProvider.validate(payload)
    }
}
