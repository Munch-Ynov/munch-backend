import { Reservation as PrismaReservation } from '@prisma/client'
import { Mapper } from '../base.mapper'
import { Reservation } from 'src/module/reservation/model/reservation.model'

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
