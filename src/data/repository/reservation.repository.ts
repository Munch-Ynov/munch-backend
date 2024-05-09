import type { Reservation } from 'src/data/models'
import { Repository } from './base.repository'

abstract class ReservationRepository extends Repository<Reservation> {
    abstract findByUserId(userId: string): Promise<Reservation>
}

export { ReservationRepository }
