import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { HashService } from "src/util/hash/hash.service";
import type Auth from "../models/auth.model";
import type { Role } from "../models/enum";

@Injectable()
export class DatabaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService
  ) {}

  async createUser(
    authId: Auth["id"],
    userDTO: {
      name: string;
      avatar: string;
      banner: string;
      phone: string;
    }
  ) {
    // Create user
    const user = await this.prisma.userProfile.create({
      data: {
        id: authId,
        name: userDTO.name,
        avatar: userDTO.avatar,
        banner: userDTO.banner,
        phone: userDTO.phone,
      },
    });

    if (!user) {
      throw new InternalServerErrorException("Failed to create user");
    }

    return user;
  }

  async createAuth(email: string, password: string, role: Role) {
    // Create auth
    const encryptedPassword = await this.hashService.hashPassword(password);

    return this.prisma.auth.create({
      data: {
        email,
        password,
        role,
      },
    });
  }
}
