import { Repository } from '@/data/repository/base.repository'
import { Reservation } from '../model/reservation.model'

abstract class ReservationRepository extends Repository<Reservation> {
    abstract findByUserId(userId: string): Promise<Reservation>
}

export { ReservationRepository }
