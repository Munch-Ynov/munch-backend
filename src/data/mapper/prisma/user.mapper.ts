
import type { UserProfile as PrismaUserProfile } from "@prisma/client";
import type { UserProfile } from "src/data/models";
import type { Mapper } from "../base.mapper";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const UserMapper: Mapper<UserProfile, PrismaUserProfile> = class {

  static toEntity(userProfile: PrismaUserProfile): UserProfile {
    return {
      ...userProfile,
      authId: userProfile.id,
    }
  }

  static toData(userProfile: UserProfile): PrismaUserProfile {
    return {
      ...userProfile,
      avatar: userProfile.avatar,
      banner: userProfile.banner,
      id: userProfile.authId,
      phone: userProfile.phone,
    }
  }
}

export { UserMapper };

