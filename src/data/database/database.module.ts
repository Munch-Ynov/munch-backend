import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { PrismaService } from "./prisma/prisma.service";
import { SeederModule } from "./seeder/seeder.module";
import { HashModule } from "src/util/hash/hash.module";

@Module({
  controllers: [],
  providers: [DatabaseService, PrismaService],
  imports: [SeederModule, HashModule],
})
export class DatabaseModule {}
