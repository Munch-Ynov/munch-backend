import { Repository } from '../base.repository'
import { Model } from 'src/data/models/base.model'
import { Mapper } from 'src/data/mapper/base.mapper'
import { Filter, PaginationRequest } from 'src/data/util'
import { Pageable } from 'src/data/util'

export abstract class PrismaRepository<M extends Model, D>
    implements Repository<M> {
    private $prisma
    protected $mapper: Mapper<M, D>

    constructor(prisma, mapper: Mapper<M, D>) {
        this.$prisma = prisma
        this.$mapper = mapper
    }

    async createOne(entity: M): Promise<M> {
        const r: D = await this.$prisma.create({ data: entity })
        return this.$mapper.toEntity(r) as M
    }

    async createMany(entities: M[]): Promise<M[]> {
        const r: Array<D> = await this.$prisma.createMany({ data: entities })
        return r.map((d) => this.$mapper.toEntity(d)) as M[]
    }

    async findOne(id: string): Promise<M> {
        const r: D = await this.$prisma.findFirst({ where: { id } })
        return this.$mapper.toEntity(r) as M
    }
    async findMany({
        filter,
        pageable: { page, size, sort },
    }: {
        filter?: Filter<M>
        pageable?: PaginationRequest<M>
    }): Promise<Pageable<M>> {
        const totalElements = await this.$prisma.auth.count({ where: filter })
        const content = await this.$prisma.auth.findMany({
            where: filter,
            orderBy: sort.getSort(),
            skip: page * size,
            take: size,
        })
        return Pageable.of({
            content: content.map(this.$mapper.toEntity),
            totalElements,
            request: { page, size, sort },
        })
    }

    async updateOne(id: string, entity: Partial<M>): Promise<M> {
        const r: D = await this.$prisma.update({
            where: { id },
            data: this.$mapper.toData(entity),
        })
        return this.$mapper.toEntity(r) as M
    }

    async updateMany(filter: Filter<M>, entity: Partial<M>): Promise<M[]> {
        const r: Array<D> = await this.$prisma.updateMany({
            where: filter,
            data: this.$mapper.toData(entity),
        })
        return r.map((d) => this.$mapper.toEntity(d)) as M[]
    }

    async deleteOne(id: string): Promise<void> {
        await this.$prisma.delete({ where: { id } })
    }

    deleteMany(filter: Filter<M>): Promise<void> {
        return this.$prisma.deleteMany({ where: filter })
    }
}
