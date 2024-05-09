import { Module } from '@nestjs/common'
import { AuthRepository } from './auth.repository'
import { AuthPrismaRepository } from './prisma/auth.prisma-repository'
import { CategoryRepository } from './category.repository'
import { CategoryPrismaRepository } from './prisma/category.prisma-repository'
import { FavoriteRepository } from './favorite.repository'
import { FavoritePrismaRepository } from './prisma/favorite.prisma-repository'
import { ReservationRepository } from './reservation.repository'
import { ReservationPrismaRepository } from './prisma/reservation.prisma-repository'
import { RestaurantRepository } from './restaurant.repository'
import { RestaurantPrismaRepository } from './prisma/restaurant.prisma-repository'
import { RestaurantFeatureRepository } from './restaurant-feature.repository'
import { RestaurantFeaturePrismaRepository } from './prisma/restaurant-feature.prisma-repository'
import { RestaurateurRepository } from './restaurateur.repository'
import { UserRepository } from './user.repository'
import { UserPrismaRepository } from './prisma/user.prisma-repository'
import { RestaurateurPrismaRepository } from './prisma/restaurateur.prisma-repository'
import { PrismaService } from './prisma/service/prisma.service'

@Module({
    imports: [],
    controllers: [],
    providers: [
        PrismaService,
        {
            provide: AuthRepository,
            useClass: AuthPrismaRepository,
        },
        {
            provide: CategoryRepository,
            useClass: CategoryPrismaRepository,
        },
        {
            provide: FavoriteRepository,
            useClass: FavoritePrismaRepository,
        },
        {
            provide: ReservationRepository,
            useClass: ReservationPrismaRepository,
        },
        {
            provide: RestaurantRepository,
            useClass: RestaurantPrismaRepository,
        },
        {
            provide: RestaurantFeatureRepository,
            useClass: RestaurantFeaturePrismaRepository,
        },
        {
            provide: RestaurateurRepository,
            useClass: RestaurateurPrismaRepository,
        },
        {
            provide: UserRepository,
            useClass: UserPrismaRepository,
        },
    ],
    exports: [
        AuthRepository,
        CategoryRepository,
        FavoriteRepository,
        ReservationRepository,
        RestaurantRepository,
        RestaurantFeatureRepository,
        RestaurateurRepository,
        UserRepository,
    ],
})
export class RepositoryModule {}
