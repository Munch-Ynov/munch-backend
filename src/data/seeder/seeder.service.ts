// import { Injectable } from '@nestjs/common'
// import { adminSeeder, userSeeder, restaurantSeeder } from './profile.seeder'
// import {
//     categoriesFeaturesSeeder,
//     cuisineSeeder,
//     regimeSeeder,
// } from './features.seeder'
// import { Role } from '@/data/models/enum'

// import { UserProfile } from '../models/user-profile.model'
// import { AuthRepository } from '../repository/auth.repository'
// import { CategoryRepository } from '../repository/category.repository'
// import { RestaurantFeatureRepository } from '../repository/restaurant-feature.repository'
// import { RestaurateurRepository } from '../repository/restaurateur.repository'
// import { UserRepository } from '../repository/user.repository'

// @Injectable()
// export class SeederService {
//     constructor(
//         private readonly authRepository: AuthRepository,
//         private readonly userRepository: UserRepository,
//         private readonly restaurateurRepository: RestaurateurRepository,
//         private readonly categoryRepository: CategoryRepository,
//         private readonly restaurantFeatureRepository: RestaurantFeatureRepository
//     ) {}

//     async seedAll() {
//         // Seed data here
//         await this.seedAdmin()
//         await this.seedUsers()
//         // await this.seedRestaurantProfiles();
//         // await this.seedRestaurants();
//         // await this.seedCategories();
//         // await this.seedRestaurantFeatures();
//         // await this.seedReservations();
//         // await this.seedFavorites();
//     }

//     async seedAdmin() {
//         const adminExists = await this.authRepository.findByEmail(
//             adminSeeder.email
//         )
//         console.log(adminExists)

//         // if (adminExists) {
//         //     return new Error('Admin already exists')
//         // }

//         const createAdminAuth = {
//             email: adminSeeder.email,
//             password: adminSeeder.password,
//             role: Role.ADMIN,
//         }

//         const adminAuth = await this.authRepository.createOne(createAdminAuth)

//         const createAdminUser: Omit<
//             UserProfile,
//             'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
//         > = {
//             authId: adminAuth.id,
//             name: adminSeeder.name,
//             avatar: adminSeeder.avatar,
//         }

//         await this.userRepository.createOne(createAdminUser)
//     }

//     async seedUsers() {
//         const userExists = await this.authRepository.findByEmail(
//             userSeeder.email
//         )

//         if (userExists) {
//             return
//         }

//         const userAuth = await this.authRepository.createOne({
//             email: userSeeder.email,
//             password: userSeeder.password,
//             role: Role.USER,
//         })

//         const createUserProfile = await this.userRepository.createOne({
//             authId: userAuth.id,
//             name: userSeeder.name,
//             avatar: userSeeder.avatar,
//         })
//     }

//     async seedRestaurantProfiles() {
//         // Seed restaurant profile
//         const restaurateurAuth = {
//             email: restaurantSeeder.email,
//             password: restaurantSeeder.password,
//             role: Role.RESTAURATEUR,
//         }

//         const restauAuth = await this.authRepository.createOne(restaurateurAuth)

//         if (!restaurateurAuth) {
//             throw new Error('Failed to create restaurant')
//         }

//         const restaurateur = await this.restaurateurRepository.createOne({
//             authId: restauAuth.id,
//             name: restaurantSeeder.name,
//             avatar: restaurantSeeder.avatar,
//             restaurantId: restaurantSeeder.restaurantId,
//         })

//         if (restaurateur) {
//             return Promise.resolve()
//         } else {
//             throw new Error('Failed to create restaurant profile')
//         }
//     }

//     async seedRestaurants() {
//         // Seed restaurants here
//     }

//     async seedCategories() {
//         // Seed categories here
//         const categories = await this.categoryRepository.createMany(
//             categoriesFeaturesSeeder.map((name) => ({ name }))
//         )
//         if (categories) {
//             return Promise.resolve()
//         } else {
//             throw new Error('Failed to create categories')
//         }
//     }

//     async seedRestaurantFeatures() {
//         // Seed restaurant features here
//         const categories = await this.categoryRepository.findMany({})
//         if (!categories) {
//             throw new Error('Failed to get categories')
//         }

//         const regimeCategory = categories.content.find(
//             (category) => category.name === 'Régime alimentaire'
//         )

//         const cuisineCategory = categories.content.find(
//             (category) => category.name === 'Type de cuisine'
//         )

//         const etablissementCategory = categories.content.find(
//             (category) => category.name === "Type d'établissement"
//         )

//         if (!regimeCategory || !cuisineCategory || !etablissementCategory) {
//             throw new Error('Failed to get categories')
//         }

//         const regimeFeatures =
//             await this.restaurantFeatureRepository.createMany(
//                 regimeSeeder.map((regime) => ({
//                     name: regime.name,
//                     categoryId: regimeCategory.id,
//                 }))
//             )

//         const cuisineFeatures =
//             await this.restaurantFeatureRepository.createMany(
//                 cuisineSeeder.map((cuisine) => ({
//                     name: cuisine.name,
//                     icon: cuisine.icon,
//                     categoryId: cuisineCategory.id,
//                 }))
//             )

//         if (regimeFeatures && cuisineFeatures) {
//             return
//         } else {
//             throw new Error('Failed to create features')
//         }
//     }

//     async seedReservations() {
//         // Seed reservations here
//     }

//     async seedFavorites() {
//         // Seed favorites here
//     }
// }
