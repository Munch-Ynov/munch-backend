
import type { RestaurateurProfile as PrismaRestaurateurProfile } from "@prisma/client";
import type { RestaurateurProfile } from "src/data/models";
import type { Mapper } from "../base.mapper";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const RestaurateurMapper: Mapper<RestaurateurProfile, PrismaRestaurateurProfile> = class {

  static toEntity(restaurateurProfile: PrismaRestaurateurProfile): RestaurateurProfile {
    return {
      ...restaurateurProfile,
    }
  }

  static toData(restaurateurProfile: RestaurateurProfile): PrismaRestaurateurProfile {
    return {
      ...restaurateurProfile,
      avatar: restaurateurProfile.avatar,
      banner: restaurateurProfile.banner,
    }
  }
}

export { RestaurateurMapper };

