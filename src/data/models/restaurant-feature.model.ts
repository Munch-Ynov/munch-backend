import { Model } from './base.model'

/**
 * Model of the RestaurantFeature
 * @category Models
 * @interface RestaurantFeature
 * @param {string} id - id of the feature : eg. abcdef123456
 * @param {string} name - name of the feature
 * @param {string} icon - icon of the feature
 * @param {Category} category - category of the feature
 * @param {string} categoryId - id of the category : eg. abcdef123456
 */
abstract class RestaurantFeature implements Model {
    id: string
    name: string
    icon?: string
    categoryId: string
}

export { RestaurantFeature }
