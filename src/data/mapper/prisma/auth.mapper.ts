import type { Auth as PrismaAuth } from "@prisma/client";
import type { Auth } from "src/data/models";
import type { Mapper } from "../base.mapper";
import { Role } from "src/data/models";
import { Role as PrismaRole } from "@prisma/client";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const AuthMapper: Mapper<Auth, PrismaAuth> = class {


  static toEntity(auth: PrismaAuth): Auth {
    return {
      ...auth,
      role: Role[auth.role],
    }
  }

  static toData(auth: Auth): PrismaAuth {
    return {
      ...auth,
      role: PrismaRole[auth.role],
    }
  }
}

export { AuthMapper };

