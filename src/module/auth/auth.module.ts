import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthProviderService as AuthProviderImpl } from 'src/config/authImplementation/auth-provider.service'
import { AuthPrismaRepository } from 'src/data/repository/prisma/auth.prisma-repository'
import { PrismaModule } from 'src/data/repository/prisma/service/prisma.module'
import { HashService } from 'src/util/hash/hash.service'
import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '15m' },
        }),
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: AuthRepository,
            useClass: AuthPrismaRepository,
        },
        {
            provide: AuthService,
            useClass: AuthProviderImpl,
        },
        JwtStrategy,
        HashService,
    ],
    exports: [AuthService],
})
export class AuthModule { }
