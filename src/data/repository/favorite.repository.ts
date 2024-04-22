import type { Favorite } from "src/data/models";
import type { Repository } from "./base.repository";

interface FavoriteRepository extends Repository<Favorite> {
  findByUserId(userId: string): Promise<Favorite>;
}

export type { FavoriteRepository };

