import type { Path } from './path'

// /**
//  * used to sort an entity E when fetching from the database
//  * eg :  Sort<A> = { foo.bar : "asc" }
//  */

// export type Sort<E> = {
//   [P in Path<E>]?: 'asc' | 'desc';
// }

class Sort<T> {
    private sort: { [key: string]: 'asc' | 'desc' } = {}

    constructor(sort: string) {
        const [field, order] = sort.split(',')
        this.sort[field] = order as 'asc' | 'desc'
    }

    static of<T>(sort: string): Sort<T> {
        return new Sort<T>(sort)
    }

    getSort(): { [key: string]: 'asc' | 'desc' } {
        return this.sort
    }

    toString(): string {
        return Object.entries(this.sort)
            .map(([key, value]) => `${key},${value}`)
            .join(',')
    }
}

export { Sort }
