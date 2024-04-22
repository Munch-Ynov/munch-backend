import type { Category } from "src/data/models";
import type { Repository } from "./base.repository";

interface CategoryRepository extends Repository<Category> {
  findByName(name: string): Promise<Category>;
}

export type { CategoryRepository };
