import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { adminSeeder, userSeeder, restaurantSeeder } from "./profile.seeder";
import {
  categoriesFeaturesSeeder,
  cuisineSeeder,
  etablissementSeeder,
  regimeSeeder,
} from "./features.seeder";
import { Role } from "src/data/models/enum";

@Injectable()
export class SeederService {
  constructor(private readonly db: DatabaseService) {}

  async seedAll() {
    // Seed data here
    await this.seedAdmin();
    await this.seedUsers();
    await this.seedRestaurantProfiles();
    // await this.seedRestaurants();
    await this.seedCategories();
    await this.seedRestaurantFeatures();
    // await this.seedReservations();
    // await this.seedFavorites();
  }

  async seedAdmin() {
    const adminAuth = await this.db.createAuth(
      adminSeeder.email,
      adminSeeder.password,
      Role.ADMIN
    );
    if (!adminAuth) {
      throw new Error("Failed to create admin");
    }

    const admin = await this.db.createUser(adminAuth.id, {
      name: adminSeeder.name,
      avatar: adminSeeder.avatar,
      banner: adminSeeder.banner,
    });

    if (admin) {
      return Promise.resolve();
    } else {
      throw new Error("Failed to create admin");
    }
  }

  async seedUsers() {
    // Seed user here
    const userAuth = await this.db.createAuth(
      userSeeder.email,
      userSeeder.password,
      Role.USER
    );
    if (!userAuth) {
      throw new Error("Failed to create user");
    }

    const user = await this.db.createUser(userAuth.id, {
      name: userSeeder.name,
      avatar: userSeeder.avatar,
      banner: userSeeder.banner,
      phone: userSeeder.phone,
    });

    if (user) {
      return Promise.resolve();
    } else {
      throw new Error("Failed to create user");
    }
  }

  async seedRestaurantProfiles() {
    // Seed restaurant profile
    const restaurateurAuth = await this.db.createAuth(
      restaurantSeeder.email,
      restaurantSeeder.password,
      Role.RESTAURATEUR
    );
    if (!restaurateurAuth) {
      throw new Error("Failed to create restaurant");
    }

    const restaurateur = await this.db.createRestaurantProfile(
      restaurateurAuth.id,
      {
        avatar: restaurantSeeder.avatar,
        banner: restaurantSeeder.banner,
      }
    );

    if (restaurateur) {
      return Promise.resolve();
    } else {
      throw new Error("Failed to create restaurant profile");
    }
  }

  async seedRestaurants() {
    // Seed restaurants here
  }

  async seedCategories() {
    // Seed categories here
    const categories = await this.db.createCategoriesFeatures(
      categoriesFeaturesSeeder
    );
    if (categories) {
      return Promise.resolve();
    } else {
      throw new Error("Failed to create categories");
    }
  }

  async seedRestaurantFeatures() {
    // Seed restaurant features here
    const categories = await this.db.getCategories();
    if (!categories) {
      throw new Error("Failed to get categories");
    }

    const regimeCategory = categories.find(
      (category) => category.name === "Régime alimentaire"
    );
    const cuisineCategory = categories.find(
      (category) => category.name === "Type de cuisine"
    );
    const etablissementCategory = categories.find(
      (category) => category.name === "Type d'établissement"
    );

    if (!regimeCategory || !cuisineCategory || !etablissementCategory) {
      throw new Error("Failed to get categories");
    }

    const regimeFeatures = await this.db.createFeatures(
      regimeSeeder,
      regimeCategory.id
    );

    const cuisineFeatures = await this.db.createFeatures(
      cuisineSeeder.map((name) => ({ name })),
      cuisineCategory.id
    );

    const etablissementFeatures = await this.db.createFeatures(
      etablissementSeeder.map((name) => ({ name })),
      etablissementCategory.id
    );

    if (regimeFeatures && cuisineFeatures && etablissementFeatures) {
      return Promise.resolve();
    } else {
      throw new Error("Failed to create features");
    }
  }

  async seedReservations() {
    // Seed reservations here
  }

  async seedFavorites() {
    // Seed favorites here
  }
}
