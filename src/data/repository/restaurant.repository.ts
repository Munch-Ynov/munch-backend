import type { Restaurant } from "src/data/models";
import type { Pageable } from "../util";
import type { Repository } from "./base.repository";

interface RestaurantRepository extends Repository<Restaurant> {
}

export type { RestaurantRepository };

