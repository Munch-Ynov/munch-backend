import { AuthProviderService as AuthProviderImpl } from '@/config/auth/auth-provider.service'
import { HashService } from '@/util/hash/service/hash.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'
import { ProfileModule } from './roles/profile.module'
import { PrismaService } from '@/prisma.service'

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '15m' },
        }),
        ProfileModule,
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: AuthService,
            useClass: AuthProviderImpl,
        },
        JwtStrategy,
        HashService,
        PrismaService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
