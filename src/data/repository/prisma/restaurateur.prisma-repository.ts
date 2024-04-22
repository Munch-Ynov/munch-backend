
import { RestaurateurMapper } from "src/data/mapper/prisma";
import type { RestaurateurRepository } from "..";
import { PrismaRepository } from "./base.prisma-repository";
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from "./prisma.service";
import type { RestaurateurProfile } from "src/data/models";
import type { RestaurateurProfile as PrismaRestaurateurProfile } from '@prisma/client';


export class RestaurateurPrismaRepository extends PrismaRepository<RestaurateurProfile, PrismaRestaurateurProfile> implements RestaurateurRepository {
  constructor(private prisma: PrismaService) {
    super(prisma.restaurateurProfile, RestaurateurMapper);
  }

}
