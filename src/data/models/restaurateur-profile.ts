import type { Model } from "./base.model";

/**
 * Model of the RestaurateurProfile
 * @category Models
 * @interface RestaurateurProfile
 * @param {string} id - id of the profile : eg. abcdef123456
 * @param {string} avatar - avatar of the restaurateur
 * @param {string} banner - banner of the restaurateur
 * @param {string} restaurantId - id of the restaurant : eg. abcdef123456
 * @param {Date} createdAt - timestamp of the creation of the restaurant profile
 * @param {Date} updatedAt - timestamp of the last update of the restaurant profile
 */
abstract class RestaurateurProfile implements Model {
  id: string;
  avatar?: string;
  banner?: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export { RestaurateurProfile };
