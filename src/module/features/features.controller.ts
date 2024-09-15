import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { FeaturesService } from './features.service'
import { CreateFeatureDto } from './dto/create-feature.dto'
import { UpdateFeatureDto } from './dto/update-feature.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('features')
@ApiTags('featuresRestaurants')
export class FeaturesController {
    constructor(private readonly featuresService: FeaturesService) {}

    @Post()
    create(@Body() createFeaturesDto: CreateFeatureDto) {
        return this.featuresService.create(createFeaturesDto)
    }

    @Get()
    findAll() {
        return this.featuresService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.featuresService.findOne(id)
    }

    @Get('restaurant/:restaurantId')
    findByRestaurantId(@Param('restaurantId') restaurantId: string) {
        return this.featuresService.findByRestaurantId(restaurantId)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateFeaturesDto: UpdateFeatureDto
    ) {
        return this.featuresService.update(id, updateFeaturesDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.featuresService.remove(id)
    }
}
