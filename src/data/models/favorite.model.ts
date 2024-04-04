import type Entity from "./entity.model";
import type Restaurant from "./restaurant.model";
import type UserProfile from "./user-profile.model";

/**
 * Model of the Favorite
 * @category Models
 * @interface Favorite
 * @param {string} id - id of the favorite : eg. abcdef123456
 * @param {UserProfile} user - user who favorited
 * @param {string} userId - id of the user : eg. abcdef123456
 * @param {Restaurant} restaurant - favorited restaurant
 * @param {string} restaurantId - id of the restaurant : eg. abcdef123456
 * @param {Date} createdAt - timestamp of the creation of the favorite
 */
abstract class Favorite implements Entity {
  id: string;
  user?: UserProfile;
  userId: string;
  restaurant: Restaurant;
  restaurantId: string;
  createdAt: Date;

  model = "Favorite"
}

export default Favorite;
