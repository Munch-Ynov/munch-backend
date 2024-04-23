
import type { RestaurateurProfile as PrismaRestaurateurProfile } from "@prisma/client";
import type { RestaurateurProfile } from "src/data/models";
import type { Mapper } from "../base.mapper";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const RestaurateurMapper: Mapper<RestaurateurProfile, PrismaRestaurateurProfile> = class {

  static toEntity(restaurateurProfile: PrismaRestaurateurProfile): RestaurateurProfile {
    return {
      ...restaurateurProfile,
      authId: restaurateurProfile.id,
    }
  }

  static toData(restaurateurProfile: RestaurateurProfile): PrismaRestaurateurProfile {
    return {
      ...restaurateurProfile,
      id: restaurateurProfile.authId,
      avatar: restaurateurProfile.avatar,
      banner: restaurateurProfile.banner,
    }
  }
}

export { RestaurateurMapper };

