enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  RESTAURATEUR = "RESTAURATEUR",
}

export type Role = keyof typeof RoleEnum;

export const Role: typeof RoleEnum = RoleEnum;
