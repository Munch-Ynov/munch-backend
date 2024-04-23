import type { Favorite as PrismaFavorite } from "@prisma/client";
import type { Favorite } from "src/data/models";
import type { Mapper } from "../base.mapper";


// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const FavoriteMapper: Mapper<Favorite, PrismaFavorite> = class {


  static toEntity(favorite: PrismaFavorite): Favorite {
    return {
      ...favorite,
    }
  }

  static toData(favorite: Favorite): PrismaFavorite {
    return {
      ...favorite,
    }
  }
}

export { FavoriteMapper };

