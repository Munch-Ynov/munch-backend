import type { Auth } from "src/data/models";
import type { Repository } from "./base.repository";

interface AuthRepository extends Repository<Auth> {
  findByEmail(email: string): Promise<Auth>;
}

export type { AuthRepository };
