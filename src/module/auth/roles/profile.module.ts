import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { UserModule } from './user/user.module'
import { RestaurateurModule } from './restaurateur/restaurateur.module'
import { PrismaService } from '@/prisma.service'
import { ProfileController } from './profile.controller'

@Module({
    imports: [UserModule, RestaurateurModule],
    controllers: [ProfileController],
    providers: [ProfileService, PrismaService],
    exports: [ProfileService],
})
export class ProfileModule {}
