import type { Reservation as PrismaReservation } from '@prisma/client'
import type { Reservation } from 'src/data/models'
import { Mapper } from '../base.mapper'

class ReservationMapper extends Mapper<Reservation, PrismaReservation> {
    $toEntity(data) {
        const { ...entity } = data
        return {
            ...entity,
        }
    }

    $toData(entity) {
        const { ...data } = entity
        return {
            ...data,
            userId: data.userId,
        }
    }
}

export { ReservationMapper }
