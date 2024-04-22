import { Category, RestaurantFeature } from "src/data/models";
export const categoriesFeaturesSeeder = [
  {
    index: 0,
    name: "Régime alimentaire",
  },
  {
    index: 1,
    name: "Type de cuisine",
  },
  {
    index: 2,
    name: "Type d'établissement",
  },
];

export const featuresSeeder = [
  {
    name: "Végétarien",
    icon: "🥦",
  },
  {
    name: "Vegan",
    icon: "🌱",
  },
  {
    name: "Sans gluten",
    icon: "🌾",
  },
  {
    name: "Halal",
    icon: "🥩",
  },
  {
    name: "Cacherout",
    icon: "🔯",
  },
] as RestaurantFeature[];
