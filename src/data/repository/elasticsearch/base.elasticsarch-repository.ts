import { Injectable } from '@nestjs/common'
import { Client } from '@elastic/elasticsearch'
import { Model } from 'src/data/models/base.model'
import { Mapper } from 'src/data/mapper/base.mapper'
import { Filter, FilterValue, PaginationRequest } from 'src/data/util'
import { Pageable } from 'src/data/util'

interface ElasticSearchModel {
    id: string
    index: string
}

//
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function esFilter<E>(filter: Filter<E>): any {
    if (!filter || Object.keys(filter).length === 0) {
        return { match_all: {} }
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const bool: any = {}

    for (const [key, value] of Object.entries(filter)) {
        if (key === 'AND' || key === 'OR' || key === 'NOT') {
            bool[key.toLowerCase()] = (value as Filter<E>[]).map(esFilter)
        } else {
            const conditions = Object.entries(value as FilterValue<E>).map(
                ([operator, operand]) => {
                    switch (operator) {
                        case 'is':
                            return { term: { [key]: operand } }
                        case 'not':
                            return {
                                bool: {
                                    must_not: { term: { [key]: operand } },
                                },
                            }
                        case 'in':
                            return { terms: { [key]: operand } }
                        case 'notIn':
                            return {
                                bool: {
                                    must_not: { terms: { [key]: operand } },
                                },
                            }
                        case 'lt':
                            return { range: { [key]: { lt: operand } } }
                        case 'lte':
                            return { range: { [key]: { lte: operand } } }
                        case 'gt':
                            return { range: { [key]: { gt: operand } } }
                        case 'gte':
                            return { range: { [key]: { gte: operand } } }
                        case 'contains':
                        case 'startsWith':
                        case 'endsWith':
                        case 'notContains':
                        case 'notStartsWith':
                        case 'notEndsWith':
                            return { wildcard: { [key]: `*${operand}*` } }
                        case 'isNull':
                            return operand
                                ? {
                                    bool: {
                                        must_not: { exists: { field: key } },
                                    },
                                }
                                : { exists: { field: key } }
                    }
                }
            )

            bool.must = (bool.must || []).concat(conditions)
        }
    }

    return { bool }
}

@Injectable()
export class BaseElasticsearchRepository<
    E extends Model,
    D extends ElasticSearchModel,
> {
    private readonly client: Client

    constructor(
        private readonly index: string,
        private readonly mapper: Mapper<E, D>
    ) {
        this.client = new Client({ node: 'http://localhost:9200' })
    }

    async search(
        filter: Filter<E>,
        pagination: PaginationRequest<E>
    ): Promise<Pageable<E>> {
        const { page, size } = pagination
        const response = await this.client.search({
            index: this.index,
            body: {
                query: esFilter(filter),
                from: page * size,
                size,
            },
        })

        const items = response.hits.hits.map(
            (hit) => this.mapper.toEntity(hit._source as D) as E
        )
        return Pageable.of<E>({
            content: items,
            totalElements:
                typeof response.hits.total === 'number'
                    ? response.hits.total
                    : response.hits.total.value,
            request: pagination,
        })
    }
}
