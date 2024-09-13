import { Auth, RestaurateurProfile, UserProfile } from '@prisma/client'

export const adminSeeder: Partial<Auth> & Partial<UserProfile> = {
    email: 'admin@munch.com',
    password: 'admin',
    name: 'Administrator',
    avatar: 'https://api.dicebear.com/8.x/shapes/svg?seed=Sugar',
}

export const userSeeder: Partial<Auth> & Partial<UserProfile> = {
    email: 'client@test.com',
    password: 'client',
    name: 'Client',
    avatar: 'https://api.dicebear.com/8.x/shapes/svg?seed=Client',
    phone: '+33612345678',
}

export const restaurantSeeder: Partial<Auth> & Partial<RestaurateurProfile> = {
    email: 'restaurateur@test.com',
    password: 'restaurateur',
}
