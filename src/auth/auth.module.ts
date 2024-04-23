import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthProviderService } from 'src/config/authImplementation/auth-provider.service';
<<<<<<< Updated upstream
import { AuthProvider } from './interface/auth-provider.interface';

@Module({
=======
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthProvider } from './interface/auth-provider.interface';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET="zjP9h6ZI5LoSKCRj",
      signOptions: { expiresIn: '15m' },
    }),
  ],
>>>>>>> Stashed changes
  controllers: [AuthController],
  providers: [AuthService, {
    provide: AuthProvider,
    useClass: AuthProviderService,
    // useExisting for singleton
<<<<<<< Updated upstream
  }],
  // aide moi enculer inversion dépendance 
=======
  },
  JwtStrategy,
  ],
  exports: [AuthService]
>>>>>>> Stashed changes

})
export class AuthModule {}
