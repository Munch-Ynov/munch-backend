import type { Reservation as PrismaReservation } from '@prisma/client'
import type { Reservation } from 'src/data/models'
import { Mapper } from '../base.mapper'

class ReservationMapper extends Mapper<Reservation, PrismaReservation> {
    $toEntity(reservation) {
        return {
            ...reservation,
        }
    }

    $toData(reservation) {
        return {
            ...reservation,
            userId: reservation.userId,
        }
    }
}

export { ReservationMapper }
