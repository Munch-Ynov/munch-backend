export enum UserRole {
  USER = "USER",
  RESTAURATEUR = "RESTAURATEUR",
  ADMIN = "ADMIN",
} 

export type Role = keyof typeof UserRole | UserRole;