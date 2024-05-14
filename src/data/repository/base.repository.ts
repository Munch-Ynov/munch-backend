import { Model } from 'src/data/models/base.model'
import { Filter } from 'src/data/util/filter'
import { Pageable, PaginationRequest } from 'src/data/util/pageable'

abstract class Repository<T extends Model> {
    abstract createOne(
        entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<T>
    abstract createMany(
        entities: Array<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<Array<T>>
    abstract findOne(id: string): Promise<T>
    abstract findMany(args: {
        filter?: Filter<T>
        pageable?: PaginationRequest<T>
    }): Promise<Pageable<T>>
    abstract updateOne(id: string, entity: Partial<T>): Promise<T>
    abstract updateMany(
        filter: Filter<T>,
        entity: Partial<T>
    ): Promise<Array<T>>
    abstract deleteOne(id: string): Promise<void>
    abstract deleteMany(filter: Filter<T>): Promise<void>
}

export { Repository }
