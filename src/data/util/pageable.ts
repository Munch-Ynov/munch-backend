import { Sort } from './sort'

export interface PaginationRequest<T, F> {
    page: number;
    size: number;
    sort: Sort<T>;
    filter?: F;
}

export class Pageable<T> {
    content: T[]
    totalElements: number
    totalPages: number
    last: boolean
    size: number
    number: number
    sort: Sort<T>
    first: boolean
    numberOfElements: number
    empty: boolean

    constructor({
        content = [],
        totalElements = 0,
        totalPages = 0,
        last = false,
        size = 0,
        number = 0,
        sort = 'id,asc',
        first = false,
        numberOfElements = 0,
        empty = false,
    }) {
        this.content = content
        this.totalElements = totalElements
        this.totalPages = totalPages
        this.last = last
        this.size = size
        this.number = number
        this.sort = Sort.of(sort)
        this.first = first
        this.numberOfElements = numberOfElements
        this.empty = empty
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    static fromArray<T>(content: T[], request: PaginationRequest<T, any>) {
        return Pageable.of({ content, totalElements: content.length, request })
    }

    static of<T, F>({
        content = [],
        totalElements = 0,
        request = { page: 0, size: 20, sort: Sort.of('id,asc') },
    }: {
        content: T[]
        totalElements: number
        request: PaginationRequest<T, F>
    }) {
        const { page, size, sort } = request
        const totalPages = Math.ceil(totalElements / size)
        const last = page === totalPages - 1
        const first = page === 0
        const numberOfElements = content.length
        const empty = numberOfElements === 0
        return new Pageable<T>({
            content,
            totalElements,
            totalPages,
            last,
            size,
            number: page,
            sort: sort?.toString() || 'id,asc',
            first,
            numberOfElements,
            empty,
        })
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    static defaultRequest<T>(): PaginationRequest<T, any> {
        return { page: 0, size: 20, sort: Sort.of('id,asc') }
    }
}

