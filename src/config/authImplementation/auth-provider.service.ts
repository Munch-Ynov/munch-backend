import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import cuid2  from '@paralleldrive/cuid2'
import { type Auth, Role } from '@prisma/client'
import { AuthRepository } from 'src/module/auth/auth.repository'
import {
    AccessToken,
    AuthService,
    Payload,
    RefreshToken,
} from 'src/module/auth/auth.service'
import { HashService } from 'src/util/hash/hash.service'

@Injectable()
export class AuthProviderService implements AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService
    ) { }

    async login(
        email: string,
        password: string
    ): Promise<{
        accessToken: AccessToken
        refreshToken: RefreshToken
    }> {
        // throw new Error("Method not implemented.");
        const authUser = await this.authRepository.findByEmail(email)

        if (!authUser) {
            throw new NotFoundException(`No authUser found for email: ${email}`)
        }

        const isPasswordMatch = await this.hashService.comparePassword(
            password,
            authUser.password
        )

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid password')
        }

        const accessToken = await this.createAccessToken(authUser)
        const refreshToken = await this.createRefreshToken(authUser)

        return { accessToken, refreshToken }
    }

    async refresh(refreshToken: RefreshToken): Promise<{
        accessToken: AccessToken
        refreshToken: RefreshToken
    }> {
        if (!refreshToken) {
            throw new UnauthorizedException('Invalid refresh token')
        }

        const authUser = await this.validateRefreshToken(refreshToken)

        const accessToken = await this.createAccessToken(authUser)
        const newRefreshToken = await this.createRefreshToken(authUser)

        return { accessToken, refreshToken: newRefreshToken }
    }

    async register(email: string, password: string, role: Role = Role.USER) {
        const encryptedPassword = await this.hashService.hashPassword(password)
        return this.authRepository.createOne({
            email,
            password: encryptedPassword,
            role,
        })
    }

    private async createAccessToken(authUser: Auth) {
        return this.jwtService.sign(
            { authId: authUser.id, role: authUser.role },
            { expiresIn: process.env.EXPIRATION_JWT_ACCESS_TOKEN || '15m' }
        )
    }

    private async createRefreshToken(authUser: Auth) {
        const tokenId = cuid2.createId()
        return this.jwtService.sign(
            { authId: authUser.id, tokenId: tokenId, role: authUser.role },
            { expiresIn: process.env.EXPIRATION_JWT_REFRESH_TOKEN || '7d' }
        )
    }

    async validate(payload: Payload) {
        const authUser = await this.authRepository.findOne(payload.authId)

        if (!authUser) {
            throw new NotFoundException(
                `No user found for id: ${payload.authId}`
            )
        }

        return authUser
    }

    private async validateRefreshToken(refreshToken: RefreshToken) {
        const payload = this.jwtService.verify(refreshToken) as Payload
        return this.validate(payload)
    }
}
