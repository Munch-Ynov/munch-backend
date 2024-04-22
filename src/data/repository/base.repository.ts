import type { Model } from "src/data/models";
import type { Filter } from "src/data/util/filter";
import type { Pageable, PageableRequest } from "src/data/util/pageable";

interface Repository<T extends Model> {
  createOne(entity: T): Promise<T>;
  createMany(entities: T[]): Promise<Array<T>>;
  findOne(id: string): Promise<T>;
  findMany(args: {
    filter?: Filter<T>;
    pageable?: PageableRequest<T>;
  }): Promise<Pageable<T>>;
  updateOne(id: string, entity: Partial<T>): Promise<T>;
  updateMany(filter: Filter<T>, entity: Partial<T>): Promise<Array<T>>;
  deleteOne(id: string): Promise<void>;
  deleteMany(filter: Filter<T>): Promise<void>;
}

export type { Repository };

