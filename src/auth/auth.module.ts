import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AuthProviderService } from 'src/config/authImplementation/auth-provider.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { AuthProvider } from './interface/auth-provider.interface'
import { HashService } from 'src/util/hash/hash.service'

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '15m' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: AuthProvider,
            useClass: AuthProviderService,
        },
        JwtStrategy,
        HashService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
