import { Path, PathValue } from './path'

/**
 * used to filter an entity E when fetching from the database
 * eg :  Filter<A> = { foo.bar :{ is: "fuzz" } }
 */
export type Filter<E> = {
    [P in Path<E>]?: FilterValue<PathValue<E, P>>
} & {
    AND?: Filter<E>[]
    OR?: Filter<E>[]
    NOT?: Filter<E>
}

export type FilterValue<T> = {
    is?: T
    not?: T
    in?: T[]
    notIn?: T[]
    lt?: T
    lte?: T
    gt?: T
    gte?: T
    contains?: T
    startsWith?: T
    endsWith?: T
    notContains?: T
    notStartsWith?: T
    notEndsWith?: T
    isNull?: boolean
}
