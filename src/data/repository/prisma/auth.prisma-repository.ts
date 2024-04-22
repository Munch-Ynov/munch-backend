import type { Auth } from "src/data/models";
import type { AuthRepository } from "../";
import { PrismaRepository } from "./base.prisma-repository";
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from "./prisma.service";
import { AuthMapper } from "src/data/mapper/prisma";
import type { Auth as PrismaAuth } from '@prisma/client';


export class AuthPrismaRepository extends PrismaRepository<Auth, PrismaAuth> implements AuthRepository {
  constructor(private prisma: PrismaService) {
    super(prisma.auth, AuthMapper);
  }


  async findByEmail(email: string): Promise<Auth> {
    const auth = await this.prisma.auth.findFirst({ where: { email } });
    return AuthMapper.toEntity(auth);
  }



}
