enum RoleEnum {
  ADMIN = "ADMIN",
  RESTAURATEUR = "RESTAURATEUR",
  ADMIN = "ADMIN",
}

export type Role = keyof typeof RoleEnum;

export const Role: typeof RoleEnum = RoleEnum;
