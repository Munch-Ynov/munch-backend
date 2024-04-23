import type { Auth } from "src/data/models";
import { Repository } from "./base.repository";

abstract class AuthRepository extends Repository<Auth> {
  abstract findByEmail(email: string): Promise<Auth>;
}

export { AuthRepository };
