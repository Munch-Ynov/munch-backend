import { ApiProperty } from '@nestjs/swagger'
import { Reservation } from '../model/reservation.model'
import { ReservationStatus } from '../model/reservation-status.enum'

/**
 * Reservation create dto
 * This is the data transfer object for creating a reservation
 * Used when a user creates a reservation
 * Status will be set to PENDING
 */
export class ReservationCreateDto {
    @ApiProperty({
        description: 'Date of the reservation',
        type: 'string',
        example: '2021-09-01T12:00:00.000Z',
    })
    date: Date

    @ApiProperty({
        description: 'Number of people for the reservation',
        type: 'number',
        example: 2,
    })
    nb_people: number

    @ApiProperty({
        description: 'User id',
        type: 'string',
        example: '60f6e1a2a4e5f0001f000001',
    })
    userId: string

    @ApiProperty({
        description: 'Restaurant id',
        type: 'string',
        example: '60f6e1a2a4e5f0001f000001',
    })
    restaurantId: string

    toEntity(): Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'> {
        return {
            date: this.date,
            nb_people: this.nb_people,
            userId: this.userId,
            restaurantId: this.restaurantId,
            status: ReservationStatus.PENDING,
        }
    }
}

/**
 * External reservation create dto
 * This is the data transfer object for creating a reservation from an external source, the user will not be specified
 * Status will be set to ACCEPTED
 */
export class ExternalReservationCreateDto {
    @ApiProperty({
        description: 'Date of the reservation',
        type: 'string',
        example: '2021-09-01T12:00:00.000Z',
    })
    date: Date

    @ApiProperty({
        description: 'Number of people for the reservation',
        type: 'number',
        example: 2,
    })
    nb_people: number

    @ApiProperty({
        description: 'Restaurant id',
        type: 'string',
        example: '60f6e1a2a4e5f0001f000001',
    })
    restaurantId: string

    toEntity(): Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'> {
        return {
            date: this.date,
            nb_people: this.nb_people,
            restaurantId: this.restaurantId,
            status: ReservationStatus.ACCEPTED,
        }
    }
}
