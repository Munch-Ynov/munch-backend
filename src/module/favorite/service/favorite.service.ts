import { Pageable, PaginationRequest } from '@/data/util'
import { PrismaService } from '@/prisma.service'
import {
  Injectable
} from '@nestjs/common'
import { Prisma, Restaurant } from '@prisma/client'

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) { }


  // add restaurant to favorite for a user
  async addFavorite({
    userId,
    restaurantId
  }: { userId: string, restaurantId: string }) {
    return this.prisma.favorite.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        restaurant: {
          connect: {
            id: restaurantId
          }
        }
      }
    })
  }

  // remove restaurant from favorite for a user
  async removeFavorite({
    userId,
    restaurantId
  }: { userId: string, restaurantId: string }) {
    return this.prisma.favorite.deleteMany({
      where: {
        userId,
        restaurantId
      }
    })
  }

  // get all favorite restaurants for a user
  async getFavorites(userId: string, request?: PaginationRequest<Restaurant, Prisma.RestaurantWhereInput>) {
    const count = await this.prisma.favorite.count({
      where: {
        userId
      }
    })
    return this.prisma.favorite.findMany({
      where: {
        userId,
        restaurant: request?.filter
      },
      skip: request?.page * request?.size,
      take: request?.size,
      orderBy: {
        restaurant: request?.sort.getSort()
      },
      include: {
        restaurant: true
      }
    }).then(favorites => {
      return favorites.map(favorite => favorite.restaurant)
    }).then(restaurants => {
      return Pageable.of({
        content: restaurants,
        totalElements: count,
        request
      })
    })
  }
}
