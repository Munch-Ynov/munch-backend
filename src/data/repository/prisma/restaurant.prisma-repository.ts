import type { Restaurant } from "src/data/models";
import type { RestaurantRepository } from "..";
import { PrismaRepository } from "./base.prisma-repository";
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from "./prisma.service";
import { RestaurantMapper } from "src/data/mapper/prisma";
import type { Restaurant as PrismaRestaurant } from '@prisma/client';
import { Pageable } from "src/data/util";


export class RestaurantPrismaRepository extends PrismaRepository<Restaurant, PrismaRestaurant> implements RestaurantRepository {
  constructor(private prisma: PrismaService) {
    super(prisma.restaurant, RestaurantMapper);
  }
}
