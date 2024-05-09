import type { Model } from './base.model'
import type { PriceCategory } from './enum/price-category.enum'
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
 * @param {Reservation[]} reservations - reservations of the restaurant
 * @param {Date} createdAt - timestamp of the creation of the restaurant
 * @param {Date} updatedAt - timestamp of the last update of the restaurant
 */
abstract class Restaurant implements Model {
    id: string
    name: string
    address: string
    description: string
    price: PriceCategory
    n_siret: string
    phone: string
    code_postal: string
    city: string
    email: string
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}

export { Restaurant }
