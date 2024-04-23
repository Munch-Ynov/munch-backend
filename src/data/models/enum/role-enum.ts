enum RoleEnum {
  ADMIN = "ADMIN",
  RESTAURATEUR = "RESTAURATEUR",
  USER = "USER",
}

export type Role = keyof typeof RoleEnum;

export const Role: typeof RoleEnum = RoleEnum;
