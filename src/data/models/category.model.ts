import type RestaurantFeature from "./restaurant-feature.model";

/**
 * Model of the Category
 * @category Models
 * @interface Category
 * @param {string} id - id of the category : eg. abcdef123456
 * @param {string} name - name of the category
 * @param {RestaurantFeature[]} feature - features in this category
 */
interface Category {
  id: string;
  name: string;
  feature: RestaurantFeature[];
}

export default Category;
