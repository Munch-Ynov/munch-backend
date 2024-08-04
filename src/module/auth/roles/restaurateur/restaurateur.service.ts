import { RestaurateurProfile } from "@prisma/client";
import { CreateRestaurateurDto } from "./dto/create-restaurateur.dto";

export abstract class RestaurateurService {
    abstract getProfile(id: string): Promise<RestaurateurProfile>;
    abstract createProfile(id: string, data: CreateRestaurateurDto): Promise<RestaurateurProfile>;
    abstract updateProfile(id: string, data: Partial<RestaurateurProfile>): Promise<RestaurateurProfile>;
    abstract deleteProfile(id: string): Promise<RestaurateurProfile>;
}
