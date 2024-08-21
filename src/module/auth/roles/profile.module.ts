import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { UserModule } from './user/user.module'
import { RestaurateurModule } from './restaurateur/restaurateur.module'
import { PrismaService } from '@/prisma.service'

@Module({
    imports: [UserModule, RestaurateurModule],
    providers: [ProfileService, PrismaService],
    exports: [ProfileService],
})
export class ProfileModule {}
