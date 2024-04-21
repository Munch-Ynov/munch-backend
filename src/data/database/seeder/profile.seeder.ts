import { Auth, RestaurateurProfile, UserProfile } from "src/data/models";

export const adminSeeder : Partial<Auth> & Partial<UserProfile> = {
  email: "admin@munch.com",
  password: "admin",
  name: "Administrator",
  avatar: "https://api.dicebear.com/8.x/shapes/svg?seed=Sugar",
  banner: "https://picsum.photos/seed/munch/800",
};

export const userSeeder : Partial<Auth> & Partial<UserProfile> = {
  email: "client@test.com",
  password: "client",
  name: "Client",
  avatar: "https://api.dicebear.com/8.x/shapes/svg?seed=Client",
  banner: "https://picsum.photos/seed/client/800",
  phone: "+33612345678",
};

export const restaurantSeeder : Partial<Auth> & Partial<RestaurateurProfile> = {
  email: "restaurateur@test.com",
  password: "restaurateur",
  
};