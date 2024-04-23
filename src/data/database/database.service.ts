import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { Auth, Category, RestaurantFeature, Role } from "../models";

@Injectable()
export class DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async createAuth(email: string, password: string, role: Role) {
    // Create auth
    return this.prisma.auth.create({
      data: {
        email,
        password,
        role,
      },
    });
  }

  async createUser(
    authId: Auth["id"],
    userDTO: {
      name: string;
      avatar: string;
      banner: string;
      phone?: string;
    }
  ) {
    // Create user
    return this.prisma.userProfile.create({
      data: {
        id: authId,
        name: userDTO.name,
        avatar: userDTO.avatar,
        banner: userDTO.banner,
        phone: userDTO.phone,
      },
    });
  }

  async createRestaurantProfile(
    authId: Auth["id"],
    restaurantDTO: {
      avatar: string;
      banner: string;
    }
  ) {
    // Create restaurant profile
    return this.prisma.restaurateurProfile.create({
      data: {
        id: authId,
        avatar: restaurantDTO.avatar,
        banner: restaurantDTO.banner,
      },
    });
  }

  async createCategoriesFeatures(categories: string[]) {
    // Create categories
    return this.prisma.category.createMany({
      data: categories.map((category) => ({
        name: category,
      })),
    });
  }

  async createFeatures(
    features: Omit<
      RestaurantFeature,
      "id" | "icon" | "category" | "restaurant" | "categoryId"
    >[],
    categoryId: Category["id"]
  ) {
    // Create features
    return this.prisma.restaurantFeature.createMany({
      data: features.map((feature) => ({
        ...feature,
        categoryId,
      })),
    });
  }

  async getCategories() {
    // Get categories
    return this.prisma.category.findMany();
  }

  async findAuthByEmail(email: string){
    return this.prisma.auth.findUnique({
      where: {
        email,
      },
    });
  }

  async findAuthById(id: string) {
    return await this.prisma.auth.findUnique({
      where: {
        id,
      },
    });
  }
}
