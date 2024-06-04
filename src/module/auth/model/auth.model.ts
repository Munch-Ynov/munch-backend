import { Model } from '@/data/models/base.model'
import { Role } from './role-enum'

/**
 * Model of the Auth
 * @category Models
 * @interface Auth
 * @param {string} id - id of the auth : eg. abcdef123456
 * @param {string} email - email of the auth
 * @param {string} password - password of the auth
 * @param {Date} createdAt - timestamp of the creation of the auth
 * @param {Date} updatedAt - timestamp of the last update of the auth
 * @param {Role} role - role of the auth
 */
abstract class Auth implements Model {
    id: string
    email: string
    password: string
    role: Role
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}

export { Auth }
