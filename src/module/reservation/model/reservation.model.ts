import { Model } from '../../../data/models/base.model'
import { ReservationStatus } from './reservation-status.enum'

/**
 * Model of the Reservation
 * @category Models
 * @interface Reservation
 * @param {string} id - id of the reservation : eg. abcdef123456
 * @param {Date} date - date of the reservation
 * @param {number} nb_people - number of people for the reservation
 * @param {ReservationStatus} status - status of the reservation
 * @param {string} userId - id of the user : eg. abcdef123456
 * @param {string} restaurantId - id of the restaurant : eg. abcdef123456
 * @param {Date} createdAt - timestamp of the creation of the reservation
 * @param {Date} updatedAt - timestamp of the last update of the reservation
 */
abstract class Reservation implements Model {
    id: string
    date: Date
    nb_people: number
    status: ReservationStatus
    userId?: string
    restaurantId: string
    createdAt: Date
    updatedAt: Date
}
export { Reservation }
