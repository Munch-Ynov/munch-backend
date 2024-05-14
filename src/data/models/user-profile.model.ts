import { Model } from './base.model'

/**
 * Model of the UserProfile
 * @category Models
 * @interface UserProfile
 * @param {string} id - id of the profile : eg. abcdef123456
 * @param {string} avatar - avatar of the user
 * @param {string} banner - banner of the user
 * @param {Date} createdAt - timestamp of the creation of the user profile
 * @param {Date} updatedAt - timestamp of the last update of the user profile
 */
abstract class UserProfile implements Model {
    id: string
    name: string
    phone?: string
    avatar?: string
    banner?: string
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}

export { UserProfile }
