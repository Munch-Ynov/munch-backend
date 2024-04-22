import { Entity } from "./entity.model";
import { Restaurant } from "./restaurant.model";

/**
 * Model of the RestaurateurProfile
 * @category Models
 * @interface RestaurateurProfile
 * @param {string} id - id of the profile : eg. abcdef123456
 * @param {string} avatar - avatar of the restaurateur
 * @param {string} banner - banner of the restaurateur
 * @param {Restaurant} restaurant - restaurant of the profile
 * @param {string} restaurantId - id of the restaurant : eg. abcdef123456
 * @param {Date} createdAt - timestamp of the creation of the restaurant profile
 * @param {Date} updatedAt - timestamp of the last update of the restaurant profile
 */
export abstract class RestaurateurProfile implements Entity {
  id: string;
  avatar?: string;
  banner?: string;
  restaurant: Restaurant;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
}
