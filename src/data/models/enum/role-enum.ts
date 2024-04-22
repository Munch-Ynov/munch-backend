enum RoleEnum {
  ADMIN = "ADMIN",
  RESTAURATEUR = "RESTAURATEUR",
  USER = "USER",
}

export { RoleEnum };
export type Role = keyof typeof RoleEnum;


