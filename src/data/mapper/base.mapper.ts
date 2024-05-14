import { Model } from '../models/base.model'

abstract class Mapper<E extends Model, D> {
    toEntity<T extends D | Partial<D> | null>(
        data: T
    ): T extends D ? E : T extends Partial<D> ? Partial<E> : null {
        if (!data) {
            return data as null
        }
        return this.$toEntity(data as D | Partial<D>) as T extends D
            ? E
            : T extends Partial<D>
            ? Partial<E>
            : null
    }

    toData<T extends E | Partial<E> | null>(
        entity: T
    ): T extends E ? D : T extends Partial<E> ? Partial<D> : null {
        if (!entity) {
            return entity as null
        }
        return this.$toData(entity as E | Partial<E>) as T extends E
            ? D
            : T extends Partial<E>
            ? Partial<D>
            : null
    }

    protected abstract $toEntity<T extends D | Partial<D>>(
        data: T
    ): T extends D ? E : Partial<E>

    protected abstract $toData<T extends E | Partial<E>>(
        entity: T
    ): T extends E ? D : Partial<D>
}

export { Mapper }
