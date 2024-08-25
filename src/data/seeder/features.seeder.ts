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
    { name: 'Moyen-Orient', icon: 'chicken-leg' },
    { name: 'Asiatique', icon: 'asia-gate' },
    { name: 'Européenne', icon: 'french-fries' },
    { name: 'Américaine', icon: 'hamburger' },
    { name: 'Africaine', icon: 'barbeque' },
    { name: 'Latine', icon: 'taco' },
]

export const typeSeeder: Omit<
    RestaurantFeature,
    'id' | 'category' | 'restaurant' | 'categoryId'
>[] = [
    { name: 'Fast-food', icon: 'hamburger' },
    { name: 'Restaurant', icon: 'restaurant' },
    { name: 'Brasserie', icon: 'beer' },
    { name: 'Café', icon: 'coffee' },
    { name: 'Bar', icon: 'cocktail' },
    { name: 'Pizzeria', icon: 'pizza' },
]
