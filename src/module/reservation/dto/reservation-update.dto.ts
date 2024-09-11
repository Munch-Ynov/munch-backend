import { ApiProperty } from '@nestjs/swagger'
import { Reservation, ReservationStatus } from '@prisma/client';


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
    nb_people?: number

    @ApiProperty({
        description: 'Time of the reservation',
        type: 'string',
        example: '2021-09-01T12:00:00.000Z',
    })
    date?: Date

    @ApiProperty({
        description: 'Status of the reservation',
        type: 'string',
        example: 'PENDING',
    })
    status?: ReservationStatus


    constructor(
        nb_people: number,
        date: Date,
        status: ReservationStatus
    ) {
        this.nb_people = nb_people
        this.date = date
        this.status = status
    }

    toEntity(): Partial<Reservation> {
        return {
            nb_people: this.nb_people,
            status: this.status,
            date: this.date,
        }
    }
}
