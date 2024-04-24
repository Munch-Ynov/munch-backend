import type { Favorite as PrismaFavorite } from "@prisma/client";
import { FavoriteMapper } from "src/data/mapper/prisma";
import type { Favorite } from "src/data/models";
import type { FavoriteRepository } from "..";
import { PrismaRepository } from "./base.prisma-repository";
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from "./service/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FavoritePrismaRepository
  extends PrismaRepository<Favorite, PrismaFavorite>
  implements FavoriteRepository
{
  constructor(private prisma: PrismaService) {
    super(prisma.favorite, FavoriteMapper);
  }

  async findByUserId(userId: string): Promise<Favorite> {
    const favorite = await this.prisma.favorite.findFirst({
      where: { userId },
    });
    return FavoriteMapper.toEntity(favorite);
  }
}
