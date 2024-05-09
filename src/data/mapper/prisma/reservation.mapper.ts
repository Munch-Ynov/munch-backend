import type { Reservation as PrismaReservation } from '@prisma/client'
import type { Reservation } from 'src/data/models'
import type { Mapper } from '../base.mapper'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const ReservationMapper: Mapper<Reservation, PrismaReservation> = class {
    static toEntity(reservation: PrismaReservation): Reservation {
        return {
            ...reservation,
        }
    }

    static toData(reservation: Reservation): PrismaReservation {
        return {
            ...reservation,
            userId: reservation.userId,
        }
    }
}

export { ReservationMapper }
