import { Injectable } from "@nestjs/common"
import { PrismaRepository } from "./base.prisma-repository"

import { Reservation as PrismaReservation } from "@prisma/client"
import { Reservation } from "@/module/reservation/model/reservation.model"
import { PrismaService } from "./service/prisma.service"
import { ReservationMapper } from "@/data/mapper/prisma/reservation.mapper"
import { ReservationRepository } from "@/module/reservation/repository/reservation.repository"

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
