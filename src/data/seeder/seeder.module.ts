import { Module } from "@nestjs/common";
import { SeederService } from "./seeder.service";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [SeederService],
})
export class SeederModule {}
