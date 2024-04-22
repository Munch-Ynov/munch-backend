
import type { Restaurant as PrismaRestaurant } from "@prisma/client";
import { PriceCategory as PrismaPriceCategory } from "@prisma/client";
import type { Restaurant } from "src/data/models";
import { PriceCategory } from "src/data/models";
import type { Mapper } from "../base.mapper";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const RestaurantMapper: Mapper<Restaurant, PrismaRestaurant> = class {

  static toEntity(restaurant: PrismaRestaurant): Restaurant {
    return {
      ...restaurant,
      price: PriceCategory[restaurant.price as PrismaPriceCategory],
    }
  }


  static toData(restaurant: Restaurant): PrismaRestaurant {
    return {
      ...restaurant,
      price: PrismaPriceCategory[restaurant.price],
    }
  }

}

export { RestaurantMapper };

