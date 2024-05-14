import { Injectable } from "@nestjs/common"
import { PrismaRepository } from "./base.prisma-repository"
import { ReservationRepository } from "src/module/reservation/reservation.repository"
import { Reservation as PrismaReservation } from "@prisma/client"
import { Reservation } from "src/module/reservation/model/reservation.model"
import { PrismaService } from "./service/prisma.service"
import { ReservationMapper } from "src/data/mapper/prisma/reservation.mapper"

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
