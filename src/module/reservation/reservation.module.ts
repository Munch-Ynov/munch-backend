import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/data/repository/prisma/service/prisma.module'
import { ReservationPrismaRepository } from '../../data/repository/prisma/reservation.prisma-repository'
import { ReservationController } from './reservation.controller'
import { ReservationRepository } from './reservation.repository'
import { ReservationService } from './reservation.service'
import { ReservationServiceImpl } from './reservation.service.impl'

@Module({
    imports: [
        PrismaModule

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
