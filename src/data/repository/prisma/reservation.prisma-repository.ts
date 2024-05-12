import type { Reservation } from 'src/data/models'
import type { ReservationRepository } from '..'
import { PrismaRepository } from './base.prisma-repository'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'
import { ReservationMapper } from 'src/data/mapper/prisma/reservation.mapper'
import type { Reservation as PrismaReservation } from '@prisma/client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReservationPrismaRepository
    extends PrismaRepository<Reservation, PrismaReservation>
    implements ReservationRepository {
    constructor(private prisma: PrismaService) {
        super(prisma.reservation, new ReservationMapper())
    }
    async findByUserId(userId: string): Promise<Reservation> {
        const reservation = await this.prisma.reservation.findFirst({
            where: { userId },
        })
        return this.$mapper.toEntity(reservation)
    }
}
