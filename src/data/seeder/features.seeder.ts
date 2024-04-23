import { Category, RestaurantFeature } from "src/data/models";
export const categoriesFeaturesSeeder = [
  "Régime alimentaire",
  "Type de cuisine",
  "Type d'établissement",
];

export const regimeSeeder: Omit<
  RestaurantFeature,
  "id" | "icon" | "category" | "restaurant" | "categoryId"
>[] = [
  {
    name: "Végétarien",
  },
  {
    name: "Vegan",
  },
  {
    name: "Sans gluten",
  },
  {
    name: "Halal",
  },
  {
    name: "Cacherout",
  },
];

export const cuisineSeeder = [
  "Moyen-Orient",
  "Asiatique",
  "Indienne",
  "Européenne",
  "Américaine",
  "Africaine",
  "Latine",
];

export const etablissementSeeder = [
  "Fast food",
  "Restaurant",
  "Bar",
  "Boulangerie",
];
