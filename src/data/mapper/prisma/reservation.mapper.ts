import type { Reservation as PrismaReservation } from "@prisma/client";
import { ReservationStatus as PrismaReservationStatus } from "@prisma/client";
import type { Reservation } from "src/data/models";
import { ReservationStatus } from "src/data/models";
import type { Mapper } from "../base.mapper";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
const ReservationMapper: Mapper<Reservation, PrismaReservation> = class {

  static toEntity(reservation: PrismaReservation): Reservation {
    return {
      ...reservation,
      status: ReservationStatus[reservation.status],
    }
  }

  static toData(reservation: Reservation): PrismaReservation {
    return {
      ...reservation,
      status: PrismaReservationStatus[reservation.status],
      userId: reservation.userId
    }
  }
}

export { ReservationMapper };

