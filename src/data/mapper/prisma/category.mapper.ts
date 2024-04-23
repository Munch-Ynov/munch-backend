import type { Category as PrismaCategory } from "@prisma/client";
import type { Category } from "src/data/models";
import type { Mapper } from "../base.mapper";


// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const CategoryMapper: Mapper<Category, PrismaCategory> = class {


  static toEntity(category: PrismaCategory): Category {
    return {
      ...category,
    }
  }

  static toData(category: Category): PrismaCategory {
    return {
      ...category,
    }
  }
}

export { CategoryMapper };

