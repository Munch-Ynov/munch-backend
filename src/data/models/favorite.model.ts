import type { Model } from './base.model'

/**
 * Model of the Favorite
 * @category Models
 * @interface Favorite
 * @param {string} id - id of the favorite : eg. abcdef123456
 * @param {string} userId - id of the user : eg. abcdef123456
 * @param {string} restaurantId - id of the restaurant : eg. abcdef123456
 * @param {Date} createdAt - timestamp of the creation of the favorite
 */
abstract class Favorite implements Model {
    id: string
    userId: string
    restaurantId: string
    createdAt: Date
}

export { Favorite }
