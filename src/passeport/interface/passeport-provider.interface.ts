import {Auth} from "src/data/models/auth.model";
import { User } from "src/user/entities/user.entity"

export interface Payload {
    authId: string;
    role: Role;
}

export type accessToken = string;
export type refreshToken = string;


export abstract class PasseportProvider {
    validate: (payload: Payload) => Promise<User>;
    createRefreshToken: (authUser: Auth) => Promise<refreshToken>; // Fix the syntax error and use the imported refreshToken type
    createAccessToken: (authUser: Auth) => Promise<accessToken>; // Fix the typo in the property name
}