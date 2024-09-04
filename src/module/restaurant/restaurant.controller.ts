import { Sort } from '@/data/util';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';
import { RolesGuard } from '@/guard/roles.guard';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';


@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantService.create(createRestaurantDto)
    }

    @Get()
    findAll(
        @Param('page') page = 0,
        @Param('size') size = 10,
        @Param('sort') sort = 'id,asc',
        @Param('name') name?,
        @Param('features') features?
    ) {
        return this.restaurantService.findAll({
            page: page,
            size: size,
            sort: Sort.of(sort),
            filter: {
                ...(name && { name: { contains: name } }),
                ...(features && { features: { some: { name: { in: features } } } }),
            },
        })
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
