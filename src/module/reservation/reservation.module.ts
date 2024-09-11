import { Module } from '@nestjs/common'

import { ReservationController } from './controller/reservation.controller'
import { ReservationService } from './service/reservation.service'
import { ReservationServiceImpl } from '@/config/reservation/reservation.service.impl'
import { RestaurantModule } from '../restaurant/restaurant.module'
import { PrismaService } from '@/prisma.service'
import { MailingService } from '../mailing/mailing.service'
import { MailingModule } from '../mailing/mailing.module'

@Module({
    imports: [RestaurantModule, MailingModule],
    controllers: [ReservationController],
    providers: [
        {
            provide: ReservationService,
            useClass: ReservationServiceImpl,
        },
        PrismaService,
    ],
    exports: [ReservationService],
})
export class ReservationModule {}
