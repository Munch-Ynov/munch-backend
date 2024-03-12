import type { Filter } from "../util/filter";
import type { Sort } from "../util/sort";

/**
 * Interface for the database handler
 */
export abstract class DatabaseHandler {

  /**
   * Connect to the database.
   * @returns A promise that resolves when the connection is established.
   */
  abstract connect(): Promise<void>;

  /**
   * Disconnect from the database.
   * @returns A promise that resolves when the connection is closed.
   */
  abstract disconnect(): Promise<void>;

  /**
   * Create a new entity in the database.
   * @param entity The entity to create.
   * @returns A promise that resolves with the created entity.
   */
  abstract createOne<T>(entity: T): Promise<T>;

  /**
   * Create multiple new entities in the database.
   * @param entities The entities to create.
   * @returns A promise that resolves with the created entities.
   */
  abstract createMany<T>(entities: T[]): Promise<T[]>;

  /**
   * Read an entity from the database by its ID.
   * @param id The ID of the entity to read.
   * @returns A promise that resolves with the read entity.
   */
  abstract readOne<T>(id: string): Promise<T>;

  /**
   * Read multiple entities from the database based on a filter, sort order, and pagination.
   * @param filter The filter criteria.
   * @param sort The sort order.
   * @param size The number of entities per page.
   * @param page The page number.
   * @returns A promise that resolves with the read entities.
   */
  abstract readMany<T>(filter: Filter<T>, sort: Sort<T>, size: number, page: number): Promise<T[]>;

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
  abstract updateMany<T>(filter: Filter<T>, entity: Partial<T>): Promise<T[]>;

  /**
   * Delete an entity from the database by its ID.
   * @param id The ID of the entity to delete.
   * @returns A promise that resolves with the deleted entity.
   */
  abstract deleteOne<T>(id: string): Promise<T>;

  /**
   * Delete multiple entities from the database based on a filter.
   * @param filter The filter criteria.
   * @returns A promise that resolves with the deleted entities.
   */
  abstract deleteMany<T>(filter: Filter<T>): Promise<T[]>;
}
