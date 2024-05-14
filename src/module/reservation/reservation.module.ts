import { Module } from '@nestjs/common'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'
import { ReservationServiceImpl } from './reservation.service.impl'
import { ReservationRepository } from './reservation.repository'
import { ReservationPrismaRepository } from './prisma/reservation.prisma-repository'

@Module({
    imports: [],
    controllers: [ReservationController],
    providers: [
        {
            provide: ReservationService,
            useClass: ReservationServiceImpl,
        },
        {
            provide: ReservationRepository,
            useClass: ReservationPrismaRepository,
        },
    ],
    exports: [ReservationService],
})
export class ReservationModule { }
