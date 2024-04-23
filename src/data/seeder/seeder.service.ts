import { Injectable } from "@nestjs/common";
import { adminSeeder, userSeeder, restaurantSeeder } from "./profile.seeder";
import {
  categoriesFeaturesSeeder,
  cuisineSeeder,
  regimeSeeder,
} from "./features.seeder";
import { Role } from "src/data/models/enum";
// biome-ignore lint/style/useImportType: <explanation>
import { AuthRepository, UserRepository } from "../repository";

@Injectable()
export class SeederService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,

  ) { }

  async seedAll() {
    // Seed data here
    await this.seedAdmin();
    await this.seedUsers();
    // await this.seedRestaurantProfiles();
    // // await this.seedRestaurants();
    // await this.seedCategories();
    // await this.seedRestaurantFeatures();
    // await this.seedReservations();
    // await this.seedFavorites();
  }

  async seedAdmin() {
    const createAdminAuth = {
      email: adminSeeder.email,
      password: adminSeeder.password,
      role: Role.ADMIN,
    }

    const adminAuth = await this.authRepository.createOne(createAdminAuth);

    const createAdminUser = {
      authId: adminAuth.id,
      name: adminSeeder.name,
      avatar: adminSeeder.avatar,
    };

    await this.userRepository.createOne(createAdminUser);
  }

  async seedUsers() {
    const createUserAuth = {
      email: userSeeder.email,
      password: userSeeder.password,
      role: Role.USER,
    }

    const userAuth = await this.authRepository.createOne(createUserAuth);

    const createUserUser = {
      authId: userAuth.id,
      name: userSeeder.name,
      avatar: userSeeder.avatar,
    };

    await this.userRepository.createOne(createUserUser);
  }

  // async seedRestaurantProfiles() {
  //   // Seed restaurant profile
  //   const restaurateurAuth = await this.db.createAuth(
  //     restaurantSeeder.email,
  //     restaurantSeeder.password,
  //     Role.RESTAURATEUR
  //   );
  //   if (!restaurateurAuth) {
  //     throw new Error("Failed to create restaurant");
  //   }

  //   const restaurateur = await this.db.createRestaurantProfile(
  //     restaurateurAuth.id,
  //     {
  //       avatar: restaurantSeeder.avatar,
  //       banner: restaurantSeeder.banner,
  //     }
  //   );

  //   if (restaurateur) {
  //     return Promise.resolve();
  //   } else {
  //     throw new Error("Failed to create restaurant profile");
  //   }
  // }

  // async seedRestaurants() {
  //   // Seed restaurants here
  // }

  // async seedCategories() {
  //   // Seed categories here
  //   const categories = await this.db.createCategoriesFeatures(
  //     categoriesFeaturesSeeder
  //   );
  //   if (categories) {
  //     return Promise.resolve();
  //   } else {
  //     throw new Error("Failed to create categories");
  //   }
  // }

  // async seedRestaurantFeatures() {
  //   // Seed restaurant features here
  //   const categories = await this.db.getCategories();
  //   if (!categories) {
  //     throw new Error("Failed to get categories");
  //   }

  //   const regimeCategory = categories.find(
  //     (category) => category.name === "Régime alimentaire"
  //   );
  //   const cuisineCategory = categories.find(
  //     (category) => category.name === "Type de cuisine"
  //   );
  //   const etablissementCategory = categories.find(
  //     (category) => category.name === "Type d'établissement"
  //   );

  //   if (!regimeCategory || !cuisineCategory || !etablissementCategory) {
  //     throw new Error("Failed to get categories");
  //   }

  //   const regimeFeatures = await this.db.createFeatures(
  //     regimeSeeder,
  //     regimeCategory.id
  //   );

  //   const cuisineFeatures = await this.db.createFeatures(
  //     cuisineSeeder.map((name) => ({ name })),
  //     cuisineCategory.id
  //   );

  //   const etablissementFeatures = await this.db.createFeatures(
  //     establishmentSeeder.map((name) => ({ name })),
  //     etablissementCategory.id
  //   );

  //   if (regimeFeatures && cuisineFeatures && etablissementFeatures) {
  //     return Promise.resolve();
  //   } else {
  //     throw new Error("Failed to create features");
  //   }
  // }

  // async seedReservations() {
  //   // Seed reservations here
  // }

  // async seedFavorites() {
  //   // Seed favorites here
  // }
}
