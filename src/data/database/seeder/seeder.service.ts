import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { AdminSeeder, UserSeeder, RestaurantSeeder } from './profile.seeder';
import { Role } from 'src/data/models/enum';

@Injectable()
export class SeederService {
    constructor(private readonly db: DatabaseService) {}
    
    async seedAll() {
        // Seed data here
        await this.seedAdmin();
        await this.seedUsers();
        await this.seedRestaurantProfiles();
    }

    async seedAdmin() {
        const admin = await this.db.createAuth(AdminSeeder.email, AdminSeeder.password, Role.ADMIN);
        if (!admin) {
            throw new Error('Failed to create admin');
        }
    }

    async seedUsers() {
        // Seed user here
        const user = await this.db.createAuth(UserSeeder.email, UserSeeder.password, Role.USER);
        if (!user) {
            throw new Error('Failed to create user');
        }

        await this.db.createUser(user.id, {
            name: UserSeeder.name,
            avatar: UserSeeder.avatar,
            banner: UserSeeder.banner,
            phone: UserSeeder.phone
        });
    }
    
    async seedRestaurantProfiles() {
        // Seed restaurant profile
        const restaurant = await this.db.createAuth(RestaurantSeeder.email, RestaurantSeeder.password, Role.RESTAURATEUR);
        if (!restaurant) {
            throw new Error('Failed to create restaurant');
        }
    }

    async seedRestaurants() {
        // Seed restaurants here
    }

    async seedRestaurantFeatures() {
        // Seed restaurant features here
    }

    async seedCategories() {
        // Seed categories here
    }

    async seedReservations() {
        // Seed reservations here
    }

    async seedFavorites() {
        // Seed favorites here
    }
}
