import type Entity from "../models/entity.model";
import type { Filter } from "../util/filter";
import type { Sort } from "../util/sort";

/**
 * Interface for the database handler
 */
export abstract class DatabaseHandler<T extends Entity> {


  /**
   * Create a new entity in the database.
   * @param entity The entity to create.
   * @returns A promise that resolves with the created entity.
   */
  abstract createOne(entity: T): Promise<T>;

  /**
   * Create multiple new entities in the database.
   * @param entities The entities to create.
   * @returns A promise that resolves with the created entities.
   */
  abstract createMany(entities: T[]): Promise<T[]>;

  /**
   * Find an entity from the database by its ID.
   * @param id The ID of the entity to find.
   * @returns A promise that resolves with the find entity.
   */
  abstract findOne(id: string): Promise<T>;

  /**
   * Find multiple entities from the database based on a filter, sort order, and pagination.
   * @param filter The filter criteria.
   * @param sort The sort order.
   * @param size The number of entities per page.
   * @param page The page number.
   * @returns A promise that resolves with the find entities.
   */
  abstract findMany(filter: Filter<T>, sort: Sort<T>, size: number, page: number): Promise<T[]>;

  /**
   * Update an entity in the database by its ID.
   * @param id The ID of the entity to update.
   * @param entity The new data for the entity.
   * @returns A promise that resolves with the updated entity.
   */
  abstract updateOne<T>(id: string, entity: Partial<T>): Promise<T>;

  /**
   * Update multiple entities in the database based on a filter.
   * @param filter The filter criteria.
   * @param entity The new data for the entities.
   * @returns A promise that resolves with the updated entities.
   */
  abstract updateMany(filter: Filter<T>, entity: Partial<T>): Promise<T[]>;

  /**
   * Delete an entity from the database by its ID.
   * @param id The ID of the entity to delete.
   * @returns A promise that resolves with the deleted entity.
   */
  abstract deleteOne(id: string): Promise<T>;

  /**
   * Delete multiple entities from the database based on a filter.
   * @param filter The filter criteria.
   * @returns A promise that resolves with the deleted entities.
   */
  abstract deleteMany(filter: Filter<T>): Promise<T[]>;
}
