import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { RestaurantService } from './restaurant.service'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { RolesGuard } from '@/guard/roles.guard'

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantService.create(createRestaurantDto)
    }

    @Get()
    findAll() {
        return this.restaurantService.findAll()
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
