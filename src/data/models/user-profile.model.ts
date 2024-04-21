import type Entity from "./entity.model";
import type Favorite from "./favorite.model";
import type Reservation from "./reservation.model";

/**
 * Model of the UserProfile
 * @category Models
 * @interface UserProfile
 * @param {string} id - id of the profile : eg. abcdef123456
 * @param {string} userId - id of the user : eg. abcdef123456
 * @param {string} avatar - avatar of the user
 * @param {string} banner - banner of the user
 * @param {Favorite[]} favorite - favorites of the user
 * @param {Reservation[]} reservation - reservations of the user
 * @param {Date} createdAt - timestamp of the creation of the user profile
 * @param {Date} updatedAt - timestamp of the last update of the user profile
 */
abstract class UserProfile implements Entity {
  id: string;
  userId: string;
  name: string;
  phone: string;
  avatar?: string;
  banner?: string;
  favorite: Favorite[];
  reservation: Reservation[];
  createdAt: Date;
  updatedAt: Date;
}

export default UserProfile;
