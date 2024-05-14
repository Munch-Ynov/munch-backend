/**
 * Enum for reservation status
 */
enum ReservationStatusEnum {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    CANCELED = 'CANCELED',
    REFUSED = 'REFUSED',
}

export type ReservationStatus = keyof typeof ReservationStatusEnum

export const ReservationStatus: typeof ReservationStatusEnum =
    ReservationStatusEnum
