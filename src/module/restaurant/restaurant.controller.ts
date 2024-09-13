import { Sort } from '@/data/util'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { RolesGuard } from '@/guard/roles.guard'
import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { RestaurantService } from './restaurant.service'

@Controller('restaurant')
@ApiTags('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantService.create(createRestaurantDto)
    }

    @Get()
    findAll(
        @Query('page') page = 0,
        @Query('size') size = 10,
        @Query('sort') sort = 'id,asc',
        @Query('name') name?,
        @Query('features') features?
    ) {
        Logger.log(
            `Finding all restaurants with page: ${page}, size: ${size}, sort: ${sort}`
        )
        return this.restaurantService.findAll({
            page: page,
            size: size,
            sort: Sort.of(sort),
            filter: {
                ...(name && { name: { contains: name } }),
                ...(features && {
                    features: { some: { name: { in: features } } },
                }),
            },
        })
    }

    @Get('owner/:ownerId')
    findAllByOwner(@Param('ownerId') ownerId: string) {
        return this.restaurantService.findAllByOwner(ownerId)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.restaurantService.findOne(id)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    update(
        @Param('id') id: string,
        @Body() updateRestaurantDto: UpdateRestaurantDto
    ) {
        return this.restaurantService.update(id, updateRestaurantDto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
        return this.restaurantService.remove(id)
    }
}
