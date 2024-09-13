import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { RestaurantModule } from '../../../restaurant/restaurant.module'
import { UserServiceImpl } from '@/config/auth/roles/user/user.service.impl'
import { PrismaService } from '@/prisma.service'

@Module({
    imports: [RestaurantModule],
    providers: [
        {
            provide: UserService,
            useClass: UserServiceImpl,
        },
        PrismaService,
    ],
    exports: [UserService],
})
export class UserModule {}
