
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RestaurantModule } from '../../../restaurant/restaurant.module';
import { UserServiceImpl } from '@/config/auth/roles/user/user.service.impl';

@Module({
    imports: [
        RestaurantModule,
    ],
    controllers: [UserController],
    providers: [
        {
            provide: UserService,
            useClass: UserServiceImpl,
        },
    ],
    exports: [UserService],
})
export class UserModule {}


