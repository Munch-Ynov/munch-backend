import type { Reservation } from "src/data/models";
import type { Repository } from "./base.repository";

interface ReservationRepository extends Repository<Reservation> {
  findByUserId(userId: string): Promise<Reservation>;
}

export type { ReservationRepository };
