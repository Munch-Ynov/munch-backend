import type { Model } from '../models'

interface Mapper<E extends Model, D> {
    toEntity(data: D): E
    toEntity(data: Partial<D>): Partial<E>
    toData(entity: E): D
    toData(entity: Partial<E>): Partial<D>
}

export type { Mapper }
