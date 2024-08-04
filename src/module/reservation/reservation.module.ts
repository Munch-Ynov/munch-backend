import { Module } from '@nestjs/common'

import { ReservationController } from './controller/reservation.controller'
import { ReservationService } from './service/reservation.service'
import { ReservationServiceImpl } from '@/config/reservation/reservation.service.impl'
import { RestaurantModule } from '../restaurant/restaurant.module'


@Module({
    imports: [
        RestaurantModule,
    ],
    controllers: [ReservationController],
    providers: [
        {
            provide: ReservationService,
            useClass: ReservationServiceImpl,
        },
    ],
    exports: [ReservationService],
})
export class ReservationModule { }
