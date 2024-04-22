/**
 * Enum for reservation status
 */
enum ReservationStatusEnum {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
}

export { ReservationStatusEnum };
export type ReservationStatus = keyof typeof ReservationStatusEnum;
