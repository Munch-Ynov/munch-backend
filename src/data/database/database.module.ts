import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  controllers: [],
  providers: [DatabaseService, PrismaService],
})
export class DatabaseModule {}
