import { Module } from '@nestjs/common'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'
import { ReservationServiceImpl } from './reservation.service.impl'

@Module({
    imports: [],
    controllers: [ReservationController],
    providers: [
        {
            provide: ReservationService,
            useClass: ReservationServiceImpl,
        },
    ],
    exports: [ReservationService],
})
export class ReservationModule {}
