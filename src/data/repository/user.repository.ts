import type { UserProfile } from "src/data/models";
import type { Repository } from "./base.repository";


interface UserRepository extends Repository<UserProfile> { }

export type { UserRepository };
