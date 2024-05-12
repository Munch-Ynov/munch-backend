import type { Category } from 'src/data/models'
import type { CategoryRepository } from '..'
import { PrismaRepository } from './base.prisma-repository'
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from './service/prisma.service'
import { CategoryMapper } from 'src/data/mapper/prisma/category.mapper'
import type { Category as PrismaCategory } from '@prisma/client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CategoryPrismaRepository
    extends PrismaRepository<Category, PrismaCategory>
    implements CategoryRepository {
    constructor(private prisma: PrismaService) {
        super(prisma.category, new CategoryMapper())
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.prisma.category.findFirst({
            where: { name },
        })
        return this.$mapper.toEntity(category)
    }
}
