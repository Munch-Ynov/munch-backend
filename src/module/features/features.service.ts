import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateFeatureDto } from './dto/create-feature.dto'
import { UpdateFeatureDto } from './dto/update-feature.dto'
import { PrismaService } from '@/prisma.service'

@Injectable()
export class FeaturesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createFeatureDto: CreateFeatureDto) {
        return this.prisma.restaurantFeature.create({
            data: createFeatureDto,
        })
    }

    async findAll() {
        // return this.prisma.restaurantFeature.groupBy({
        //     by: ['categoryId'],
        // })

        return this.prisma.restaurantFeature.findMany({
            include: {
                category: true,
            },
        })
    }

    async findOne(id: string) {
        return this.prisma.restaurantFeature.findUnique({
            where: { id },
        })
    }

    async update(id: string, updateFeatureDto: UpdateFeatureDto) {
        const feature = await this.prisma.restaurantFeature.findUnique({
            where: { id },
        })

        if (!feature) {
            throw new NotFoundException('Feature not found')
        }

        return this.prisma.restaurantFeature.update({
            where: { id },
            data: updateFeatureDto,
        })
    }

    async remove(id: string) {
        const feature = await this.prisma.restaurantFeature.findUnique({
            where: { id },
        })

        if (!feature) {
            throw new NotFoundException('Feature not found')
        }

        return this.prisma.restaurantFeature.delete({
            where: { id },
        })
    }
}
