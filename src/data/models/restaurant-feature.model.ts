import type Category from "./category.model";
import type Restaurant from "./restaurant.model";

/**
 * Model of the RestaurantFeature
 * @category Models
 * @interface RestaurantFeature
 * @param {string} id - id of the feature : eg. abcdef123456
 * @param {string} name - name of the feature
 * @param {string} icon - icon of the feature
 * @param {Category} category - category of the feature
 * @param {string} categoryId - id of the category : eg. abcdef123456
 * @param {Restaurant[]} restaurant - restaurants with this feature
 */
interface RestaurantFeature {
  id: string;
  name: string;
  icon?: string;
  category: Category;
  categoryId: string;
  restaurant: Restaurant[];
}

export default RestaurantFeature;
