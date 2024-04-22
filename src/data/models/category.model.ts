import type { Model } from "./base.model";
import type { RestaurantFeature } from "./restaurant-feature.model";

/**
 * Model of the Category
 * @category Models
 * @interface Category
 * @param {string} id - id of the category : eg. abcdef123456
 * @param {string} name - name of the category
 * @param {RestaurantFeature[]} feature - features in this category
 */
abstract class Category implements Model {
  id: string;
  name: string;
}

export { Category };
