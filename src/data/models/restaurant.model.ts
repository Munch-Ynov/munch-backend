import type Entity from "./entity.model";
import type PriceCategory from "./enum/price-category.enum";
import type Favorite from "./favorite.model";
import type Reservation from "./reservation.model";
import type RestaurantFeature from "./restaurant-feature.model";
import type RestaurateurProfile from "./restaurateur-profile";

/**
 * Model of the Restaurant
 * @category Models
 * @interface Restaurant
 * @param {string} id - id of the restaurant : eg. abcdef123456
 * @param {string} name - name of the restaurant
 * @param {string} address - address of the restaurant
 * @param {string} description - description of the restaurant
 * @param {PriceCategory} price - price category of the restaurant
 * @param {string} n_siret - siret number of the restaurant
 * @param {string} phone - phone number of the restaurant
 * @param {string} code_postal - postal code of the restaurant
 * @param {string} city - city of the restaurant
 * @param {string} email - email of the restaurant
 * @param {RestaurantFeature[]} features - features of the restaurant
 * @param {Favorite[]} favorites - favorites of the restaurant
 * @param {Reservation[]} reservations - reservations of the restaurant
 * @param {Date} createdAt - timestamp of the creation of the restaurant
 * @param {Date} updatedAt - timestamp of the last update of the restaurant
 * @param {RestaurateurProfile[]} restaurateur - profiles of the restaurateurs
 */
abstract class Restaurant implements Entity {
  id: string;
  name: string;
  address: string;
  description: string;
  price: PriceCategory;
  n_siret: string;
  phone: string;
  code_postal: string;
  city: string;
  email: string;
  features: RestaurantFeature[];
  favorites: Favorite[];
  reservations: Reservation[];
  createdAt: Date;
  updatedAt: Date;
  restaurateur: RestaurateurProfile[];

  model = "Restaurant"
}

export default Restaurant;
