import type { Model } from "src/data/models";
import type { Filter } from "src/data/util/filter";
import type { Pageable, PageableRequest } from "src/data/util/pageable";

abstract class Repository<T extends Model> {
  abstract createOne(entity: T): Promise<T>;
  abstract createMany(entities: T[]): Promise<Array<T>>;
  abstract findOne(id: string): Promise<T>;
  abstract findMany(args: {
    filter?: Filter<T>;
    pageable?: PageableRequest<T>;
  }): Promise<Pageable<T>>;
  abstract updateOne(id: string, entity: Partial<T>): Promise<T>;
  abstract updateMany(filter: Filter<T>, entity: Partial<T>): Promise<Array<T>>;
  abstract deleteOne(id: string): Promise<void>;
  abstract deleteMany(filter: Filter<T>): Promise<void>;
}

export { Repository };

