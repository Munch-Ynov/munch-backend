
import type { Restaurant as PrismaRestaurant } from "@prisma/client";
import type { Restaurant } from "src/data/models";
import type { Mapper } from "../base.mapper";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const RestaurantMapper: Mapper<Restaurant, PrismaRestaurant> = class {

  static toEntity(restaurant: PrismaRestaurant): Restaurant {
    return {
      ...restaurant,
    }
  }


  static toData(restaurant: Restaurant): PrismaRestaurant {
    return {
      ...restaurant,
    }
  }

}

export { RestaurantMapper };

