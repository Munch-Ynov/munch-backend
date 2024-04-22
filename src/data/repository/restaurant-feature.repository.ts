import type { RestaurantFeature } from "src/data/models";
import type { Repository } from "./base.repository";
import type { Pageable } from "../util";

interface RestaurantFeatureRepository extends Repository<RestaurantFeature> {
}

export type { RestaurantFeatureRepository };
