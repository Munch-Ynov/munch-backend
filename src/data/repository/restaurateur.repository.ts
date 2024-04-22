import type { RestaurateurProfile } from "src/data/models";
import type { Repository } from "./base.repository";


interface RestaurateurRepository extends Repository<RestaurateurProfile> { }

export type { RestaurateurRepository };
