import type { Restaurant } from "src/data/models";
import { Repository } from "./base.repository";

abstract class RestaurantRepository extends Repository<Restaurant> {
}

export type { RestaurantRepository };

