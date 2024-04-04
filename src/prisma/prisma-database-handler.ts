import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import type { DatabaseHandler } from 'src/data/database/database-handler.interface';
import Entity from 'src/data/models/entity.model';
import type { Filter } from 'src/data/util/filter';
import type { Sort } from 'src/data/util/sort';



@Injectable()
export class PrismaDatabaseHandler<T extends Entity> implements DatabaseHandler<T> {

  constructor(
    private readonly prisma: PrismaClient,
  ) { }

  createOne(entity: T): Promise<T> {
    this.prisma.
  }
  createMany(entities: T[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  findMany(filter: Filter<T>, sort: Sort<T>, size: number, page: number): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  updateOne<T>(id: string, entity: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateMany(filter: Filter<T>, entity: Partial<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  deleteMany(filter: Filter<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }


}

