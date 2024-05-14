import type { Reservation } from 'src/data/models'
import { Repository } from 'src/data/repository/base.repository'

abstract class ReservationRepository extends Repository<Reservation> {
    abstract findByUserId(userId: string): Promise<Reservation>
}

export { ReservationRepository }
