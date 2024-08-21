import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { type Auth, Role } from '@prisma/client'
import {
    AccessToken,
    AuthService,
    Payload,
    RefreshToken,
} from '@/module/auth/auth.service'
import { HashService } from '@/util/hash/service/hash.service'
import { PrismaService } from '@/prisma.service'

@Injectable()
export class AuthProviderService implements AuthService {
    constructor(
        // private readonly authRepository: AuthRepository,
        private readonly prisma: PrismaService,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService
    ) {}

    async login(
        email: string,
        password: string
    ): Promise<{
        accessToken: AccessToken
        refreshToken: RefreshToken
    }> {
        // throw new Error("Method not implemented.");
        // const authUser = await this.authRepository.findByEmail(email)
        const authUser = await this.prisma.auth.findUnique({
            where: {
                email: email,
            },
        })

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
        try {
            Logger.log(`Registering user with email: ${email}`)
            const encryptedPassword =
                await this.hashService.hashPassword(password)

            // check if email already exists
            // const existingUser = await this.authRepository.findByEmail(email)
            const existingUser = await this.prisma.auth.findUnique({
                where: {
                    email: email,
                },
            })
            if (existingUser) {
                Logger.error(`Email already exists: ${email}`)
                throw new ConflictException('Email already exists')
            }

            // return this.authRepository.createOne({
            //     email,
            //     password: encryptedPassword,
            //     role,
            // })
            return this.prisma.auth.create({
                data: {
                    email,
                    password: encryptedPassword,
                    role,
                },
            })
        } finally {
            Logger.log(`User registered with email: ${email}`)
        }
    }

    public async createAccessToken(authUser: Auth) {
        return this.jwtService.sign(
            { authId: authUser.id, role: authUser.role },
            { expiresIn: process.env.EXPIRATION_JWT_ACCESS_TOKEN || '15m' }
        )
    }

    public async createRefreshToken(authUser: Auth) {
        return this.jwtService.sign(
            { authId: authUser.id, role: authUser.role },
            { expiresIn: process.env.EXPIRATION_JWT_REFRESH_TOKEN || '7d' }
        )
    }

    async validate(payload: Payload) {
        // const authUser = await this.authRepository.findOne(payload.authId)
        const authUser = await this.prisma.auth.findUnique({
            where: {
                id: payload.authId,
            },
        })

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
