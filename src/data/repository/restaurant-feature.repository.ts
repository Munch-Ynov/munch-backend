import type { RestaurantFeature } from "src/data/models";
import { Repository } from "./base.repository";

abstract class RestaurantFeatureRepository extends Repository<RestaurantFeature> {
}

export { RestaurantFeatureRepository };
