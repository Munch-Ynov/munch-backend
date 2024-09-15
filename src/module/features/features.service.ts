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

    async findByRestaurantId(restaurantId: string) {
        return this.prisma.restaurantFeature
            .findMany({
                where: {
                    restaurant: {
                        some: { id: restaurantId },
                    },
                },
                include: {
                    category: true,
                },
            })
            .then((features) => {
                return features.reduce((acc, feature) => {
                    const category = feature.category.name
                    if (!acc[category]) {
                        acc[category] = []
                    }
                    acc[category].push(feature)
                    return acc
                }, {})
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
