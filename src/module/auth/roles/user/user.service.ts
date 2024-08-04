import { UserProfile } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";

export abstract class UserService {
    abstract getProfile(id: string): Promise<UserProfile>;
    abstract createProfile(id: string, data: CreateUserDto): Promise<UserProfile>;
    abstract updateProfile(id: string, data: Partial<UserProfile>): Promise<UserProfile>;
    abstract deleteProfile(id: string): Promise<UserProfile>;
}
