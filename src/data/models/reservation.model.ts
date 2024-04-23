import { Entity } from "./entity.model";
import { ReservationStatus } from "./enum";
import { Restaurant } from "./restaurant.model";
import { UserProfile } from "./user-profile.model";

/**
 * Model of the Reservation
 * @category Models
 * @interface Reservation
 * @param {string} id - id of the reservation : eg. abcdef123456
 * @param {Date} date - date of the reservation
 * @param {number} nb_people - number of people for the reservation
 * @param {ReservationStatus} status - status of the reservation
 * @param {UserProfile} user - user who made the reservation
 * @param {string} userId - id of the user : eg. abcdef123456
 * @param {Restaurant} restaurant - restaurant for the reservation
 * @param {string} restaurantId - id of the restaurant : eg. abcdef123456
 * @param {Date} createdAt - timestamp of the creation of the reservation
 * @param {Date} updatedAt - timestamp of the last update of the reservation
 */
export abstract class Reservation implements Entity {
  id: string;
  date: Date;
  nb_people: number;
  status: ReservationStatus;
  user?: UserProfile;
  userId?: string;
  restaurant: Restaurant;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Reservation;
