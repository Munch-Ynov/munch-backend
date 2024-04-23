import { Entity } from "./entity.model";
import { Role } from "./enum";

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
export interface Auth {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
}
