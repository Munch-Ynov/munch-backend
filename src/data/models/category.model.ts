import { Entity } from "./entity.model";
import { RestaurantFeature } from "./restaurant-feature.model";

/**
 * Model of the Category
 * @category Models
 * @interface Category
 * @param {string} id - id of the category : eg. abcdef123456
 * @param {string} name - name of the category
 * @param {RestaurantFeature[]} feature - features in this category
 */
export abstract class Category implements Entity {
  id: string;
  name: string;
  feature: RestaurantFeature[];
}
