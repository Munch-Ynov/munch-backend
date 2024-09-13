import { RestaurantFeature } from '@prisma/client'

export const categoriesFeaturesSeeder = [
    'Régime alimentaire',
    'Type de cuisine',
    "Type d'établissement",
]

export const regimeSeeder: Omit<
    RestaurantFeature,
    'id' | 'icon' | 'category' | 'restaurant' | 'categoryId'
>[] = [
    {
        name: 'Végétarien',
    },
    {
        name: 'Vegan',
    },
    {
        name: 'Sans gluten',
    },
    {
        name: 'Halal',
    },
    {
        name: 'Cacherout',
    },
]

export const cuisineSeeder: Omit<
    RestaurantFeature,
    'id' | 'category' | 'restaurant' | 'categoryId'
>[] = [
    { name: 'Moyen-Orient' },
    { name: 'Asiatique' },
    { name: 'Européenne' },
    { name: 'Américaine' },
    { name: 'Africaine' },
    { name: 'Latine' },
]

export const typeSeeder: Omit<
    RestaurantFeature,
    'id' | 'category' | 'restaurant' | 'categoryId'
>[] = [
    { name: 'Fast-food' },
    { name: 'Restaurant' },
    { name: 'Brasserie' },
    { name: 'Café' },
    { name: 'Bar' },
    { name: 'Pizzeria' },
]
