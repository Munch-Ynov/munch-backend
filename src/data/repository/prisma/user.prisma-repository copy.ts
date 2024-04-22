
import { UserMapper } from "src/data/mapper/prisma";
import type { UserRepository } from "..";
import { PrismaRepository } from "./base.prisma-repository";
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from "./prisma.service";
import type { UserProfile } from "src/data/models";
import type { UserProfile as PrismaUserProfile } from '@prisma/client';


export class UserPrismaRepository extends PrismaRepository<UserProfile, PrismaUserProfile> implements UserRepository {
  constructor(private prisma: PrismaService) {
    super(prisma.userProfile, UserMapper);
  }

}
