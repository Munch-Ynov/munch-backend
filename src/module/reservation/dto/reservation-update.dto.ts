import { ApiProperty } from '@nestjs/swagger'
import { Reservation } from '../model/reservation.model';
import { ReservationStatus } from '../model/reservation-status.enum';

/**
 * Reservation create dto
 * This is the data transfer object for creating a reservation
 * Used when a user creates a reservation
 * Status will be set to PENDING
 */
export class ReservationUpdateDto {
    @ApiProperty({
        description: 'Number of people for the reservation',
        type: 'number',
        example: 2,
    })
    nb_people: number

    @ApiProperty({
        description: 'Time of the reservation',
        type: 'string',
        example: '2021-09-01T12:00:00.000Z',
    })
    date: Date

    constructor({ nb_people, date }: { nb_people: number; date: Date }) {
        this.nb_people = nb_people
        this.date = date
    }

    toEntity(): Partial<Reservation> {
        return {
            nb_people: this.nb_people,
            status: ReservationStatus.PENDING,
            date: this.date,
        }
    }
}
