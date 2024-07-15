import { Module } from '@nestjs/common'
import { PrismaModule } from '@/data/repository/prisma/service/prisma.module'
import { ReservationPrismaRepository } from '../../data/repository/prisma/reservation.prisma-repository'
import { ReservationController } from './controller/reservation.controller'
import { ReservationRepository } from './repository/reservation.repository'
import { ReservationService } from './service/reservation.service'
import { ReservationServiceImpl } from '@/config/reservation/reservation.service.impl'
import { UserModule } from '../user/user.module'
import { RestaurantModule } from '../restaurant/restaurant.module'


@Module({
    imports: [
        PrismaModule,
        RestaurantModule,
        UserModule
    ],
    controllers: [ReservationController],
    providers: [
        {
            provide: ReservationRepository,
            useClass: ReservationPrismaRepository,
        },
        {
            provide: ReservationService,
            useClass: ReservationServiceImpl,
        },
    ],
    exports: [ReservationService],
})
export class ReservationModule { }
