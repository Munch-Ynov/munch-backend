import { Controller, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { FavoriteService } from '../service/favorite.service'
import { Post, Param, Delete, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { Sort } from '@/data/util'


@Controller('favorite')
@ApiTags('favorite', 'API')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) { }


  // add restaurant to favorite for a user
  @Post(':userId/:restaurantId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addFavorite(@Param('userId') userId: string, @Param('restaurantId') restaurantId: string) {
    return this.favoriteService.addFavorite({ userId, restaurantId })
  }

  // remove restaurant from favorite for a user
  @Delete(':userId/:restaurantId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeFavorite(@Param('userId') userId: string, @Param('restaurantId') restaurantId: string) {
    return this.favoriteService.removeFavorite({ userId, restaurantId })
  }

  // get all favorite restaurants for a user
  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getFavorites(
    @Param('userId') userId: string,
    @Query('page') page = 0,
    @Query('size') size = 10,
    @Query('sort') sort = 'id,asc',
  ) {
    return this.favoriteService.getFavorites(userId, { page: +page, size: +size, sort: Sort.of(sort) })
  }




}
