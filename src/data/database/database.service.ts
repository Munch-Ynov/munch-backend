import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import Model from "../models/model.interface";

@Injectable()
export class DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  private getModelName<M extends Model>(data: M) {
    return data.constructor.name.toLowerCase();
  }

  async create<M extends Model>(data: M) {
    return this.prisma[this.getModelName(data)].create({ data });
  }

  async findMany<M extends Model>(data: M) {
    return this.prisma[this.getModelName(data)].findMany();
  }

  async findOne<M extends Model>(data: M & { id: number }) {
    return this.prisma[this.getModelName(data)].findUnique({
      where: { id: data.id },
    });
  }

  async update<M extends Model>(data: M & { id: number }) {
    return this.prisma[this.getModelName(data)].update({
      where: { id: data.id },
      data,
    });
  }

  async delete<M extends Model>(data: M & { id: number }) {
    return this.prisma[this.getModelName(data)].delete({
      where: { id: data.id },
    });
  }

  async deleteMany<M extends Model>(data: M) {
    return this.prisma[this.getModelName(data)].deleteMany();
  }

  async count<M extends Model>(data: M) {
    return this.prisma[this.getModelName(data)].count();
  }
}
