import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { PrismaService } from "./prisma/prisma.service";
import { HashModule } from "src/util/hash/hash.module";

@Module({
  imports: [HashModule],
  providers: [DatabaseService, PrismaService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
