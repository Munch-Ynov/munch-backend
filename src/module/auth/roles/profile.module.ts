
import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserModule } from './user/user.module';
import { RestaurateurModule } from './restaurateur/restaurateur.module';

@Module(
    {
        imports: [
            UserModule,
            RestaurateurModule,
        ],
        providers: [
          ProfileService
        ],
        exports: [ProfileService],
    }
)
export class ProfileModule {}
